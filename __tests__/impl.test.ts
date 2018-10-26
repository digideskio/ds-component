/*!
  Copyright 2018 Google LLC

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

  https://www.apache.org/licenses/LICENSE-2.0

  Unless mind by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/
import * as sut from '../src/index';
import * as DS from '../src/types';
import {
  tableTransform,
  TableTransform,
  TableTables,
  TableFormat,
  TableType,
  FieldType,
  ConceptType,
  ConfigStyleElementType,
  ObjectFormat,
  objectTransform,
  SubscriptionsOptions,
} from '../src/index';

const testDimensionFields = (numRequested: number): DS.Field[] => {
  const fields = [
    {
      id: 'dimensionField1Id',
      name: 'dimensionField1Name',
      description: 'dimensionField1Description',
      type: DS.FieldType.TEXT,
      concept: DS.ConceptType.DIMENSION,
    },
    {
      id: 'dimensionField2Id',
      name: 'dimensionField2Name',
      description: 'dimensionField2Description',
      type: DS.FieldType.BOOLEAN,
      concept: DS.ConceptType.DIMENSION,
    },
  ];
  if (numRequested > fields.length) {
    throw new Error(`Can't support ${numRequested} fields yet.`);
  }
  return fields.splice(0, numRequested);
};

const testMetricFields = (numRequested: number): DS.Field[] => {
  const fields = [
    {
      id: 'metricField1Id',
      name: 'metricField1Name',
      description: 'metricField1Description',
      type: DS.FieldType.NUMBER,
      concept: DS.ConceptType.METRIC,
    },
    {
      id: 'metricField2Id',
      name: 'metricField2Name',
      description: 'metricField2Description',
      type: DS.FieldType.PERCENT,
      concept: DS.ConceptType.METRIC,
    },
  ];
  if (numRequested > fields.length) {
    throw new Error(`Can't support ${numRequested} fields yet.`);
  }
  return fields.splice(0, numRequested);
};

const testStyle = (numRequested: number): DS.StyleEntry[] => {
  const styleElements: DS.ConfigStyle[] = [
    {
      id: 'styleId',
      label: 'styleLabel',
      elements: [
        {
          id: 'styleInnerId1',
          type: ConfigStyleElementType.FILL_COLOR,
          label: 'This is a fill color label',
          defaultValue: '13',
          value: '12',
        },
      ],
    },
    {
      id: 'styleId2',
      label: 'styleLabel2',
      elements: [
        {
          id: 'styleInnerId2',
          type: ConfigStyleElementType.AXIS_COLOR,
          label: 'This is an axis color label',
          defaultValue: '3',
          value: '4',
        },
      ],
    },
  ];
  if (numRequested > styleElements.length) {
    throw new Error(`Can't support ${numRequested} fields yet.`);
  }
  return styleElements.splice(0, numRequested);
};

const testMessage = (
  numDimensions: number,
  numMetrics: number,
  numStyle: number
): DS.Message => {
  const dimensionFields = testDimensionFields(numDimensions);
  const metricFields = testMetricFields(numMetrics);
  const fields = dimensionFields.concat(metricFields);
  const style = testStyle(numStyle);
  return {
    type: DS.MessageType.RENDER,
    config: {
      data: [
        {
          id: 'configId',
          label: 'configLabel',
          elements: [
            {
              type: DS.ConfigDataElementType.DIMENSION,
              id: 'dimensions',
              label: 'configDimension1Label',
              options: {
                min: 1,
                max: numDimensions,
                supportedTypes: [],
              },
              value: dimensionFields.map((a) => a.id),
            },
            {
              type: DS.ConfigDataElementType.METRIC,
              id: 'metrics',
              label: 'configMetric1Label',
              options: {
                min: 1,
                max: numMetrics,
                supportedTypes: [],
              },
              value: metricFields.map((a) => a.id),
            },
          ],
        },
      ],
      style,
    },
    fields,
    dataResponse: {
      tables: [
        {
          id: DS.TableType.DEFAULT,
          fields: fields.map((a) => a.id),
          rows: [1, 2].map((num) => {
            return fields.map((a) => {
              switch (a.type) {
                case DS.FieldType.TEXT:
                  return '' + num;
                case DS.FieldType.NUMBER:
                  return num;
                case DS.FieldType.BOOLEAN:
                  return num % 2 === 0;
                case DS.FieldType.PERCENT:
                  return num / 100.0;
                default:
                  throw new Error(`${a.type} is not supported yet.`);
              }
            });
          }),
        },
      ],
    },
  };
};

test('rowsByConfigId test', () => {
  const message: DS.Message = testMessage(2, 2, 2);
  const expected = {
    [DS.TableType.COMPARISON]: [],
    [DS.TableType.SUMMARY]: [],
    [DS.TableType.DEFAULT]: [
      {
        dimensions: ['1', false],
        metrics: [1, 0.01],
      },
      {
        dimensions: ['2', true],
        metrics: [2, 0.02],
      },
    ],
  };
  const actual = sut.rowsByConfigId(message);
  expect(actual).toEqual(expected);
});

test('fieldsById works correctly', () => {
  const message: DS.Message = testMessage(1, 1, 1);
  const actual = sut.fieldsById(message);
  expect(actual).toMatchObject({[message.fields[0].id]: message.fields[0]});
  expect(actual).toMatchObject({[message.fields[1].id]: message.fields[1]});
});

test('parseImage all three fields present', () => {
  const input = 'originalurl.com\u00a0\u00a0proxiedurl.com\u00a0\u00a0alt text';
  const expected: DS.ParsedImage = {
    originalUrl: 'originalurl.com',
    proxiedUrl: 'proxiedurl.com',
    altText: 'alt text',
  };
  const actual = sut.parseImage(input);
  expect(actual).toEqual(expected);
});

test('parseImage two fields present', () => {
  const input = 'originalurl.com\u00a0\u00a0proxiedurl.com';
  const expected: DS.ParsedImage = {
    originalUrl: 'originalurl.com',
    proxiedUrl: 'proxiedurl.com',
    altText: undefined,
  };
  const actual = sut.parseImage(input);
  expect(actual).toEqual(expected);
});

test('parseImage one fields present', () => {
  const input = 'originalurl.com';
  const expected: DS.ParsedImage = {
    originalUrl: 'originalurl.com',
    proxiedUrl: undefined,
    altText: undefined,
  };
  const actual = sut.parseImage(input);
  expect(actual).toEqual(expected);
});

test('subscribeToDataLegacy works', () => {
  const addEventListenerMock = jest.fn((event, cb) => {
    if (event === 'message') {
      cb({data: testMessage(1, 1, 1)});
    } else {
      throw new Error('unsupported event type for testing');
    }
  });

  const postMessageMock = jest.fn();
  const removeEventListenerMock = jest.fn();

  window.addEventListener = addEventListenerMock;
  window.parent.postMessage = postMessageMock;
  window.removeEventListener = removeEventListenerMock;

  const unSub = sut.subscribeToDataLegacy((actual) => {
    expect(actual).toBeTruthy();
  });
  unSub();
  expect(removeEventListenerMock.mock.calls.length).toBeGreaterThan(0);
});

test('subscribeToData works', () => {
  const message = testMessage(1, 1, 1);
  const addEventListenerMock = jest.fn((event, cb) => {
    if (event === 'message') {
      cb({data: message});
    } else {
      throw new Error('unsupported event type for testing');
    }
  });

  const postMessageMock = jest.fn();
  const removeEventListenerMock = jest.fn();

  window.addEventListener = addEventListenerMock;
  window.parent.postMessage = postMessageMock;
  window.removeEventListener = removeEventListenerMock;

  const unSub = sut.subscribeToData(
    (actual: TableFormat) => {
      expect(actual).toEqual(sut.tableTransform(message));
    },
    {transform: sut.tableTransform}
  );
  unSub();
  expect(removeEventListenerMock.mock.calls.length).toBeGreaterThan(0);
});

test('tableTransform empty style', () => {
  const expected: TableFormat = {
    fields: {
      dimensions: [
        {
          id: 'dimensionField1Id',
          name: 'dimensionField1Name',
          description: 'dimensionField1Description',
          type: FieldType.TEXT,
          concept: ConceptType.DIMENSION,
        },
        {
          id: 'dimensionField2Id',
          name: 'dimensionField2Name',
          description: 'dimensionField2Description',
          type: FieldType.BOOLEAN,
          concept: ConceptType.DIMENSION,
        },
      ],
      metrics: [
        {
          id: 'metricField1Id',
          name: 'metricField1Name',
          description: 'metricField1Description',
          type: FieldType.NUMBER,
          concept: ConceptType.METRIC,
        },
        {
          id: 'metricField2Id',
          name: 'metricField2Name',
          description: 'metricField2Description',
          type: FieldType.PERCENT,
          concept: ConceptType.METRIC,
        },
      ],
    },
    tables: {
      [TableType.DEFAULT]: [
        ['dimensions', 'dimensions', 'metrics', 'metrics'],
        ['1', false, 1, 0.01],
        ['2', true, 2, 0.02],
      ],
      [TableType.COMPARISON]: [],
      [TableType.SUMMARY]: [],
    },
    style: {},
  };
  const actual = tableTransform(testMessage(2, 2, 0));
  expect(actual).toEqual(expected);
});

test('tableTransform works', () => {
  const expected: TableFormat = {
    fields: {
      dimensions: [
        {
          id: 'dimensionField1Id',
          name: 'dimensionField1Name',
          description: 'dimensionField1Description',
          type: FieldType.TEXT,
          concept: ConceptType.DIMENSION,
        },
        {
          id: 'dimensionField2Id',
          name: 'dimensionField2Name',
          description: 'dimensionField2Description',
          type: FieldType.BOOLEAN,
          concept: ConceptType.DIMENSION,
        },
      ],
      metrics: [
        {
          id: 'metricField1Id',
          name: 'metricField1Name',
          description: 'metricField1Description',
          type: FieldType.NUMBER,
          concept: ConceptType.METRIC,
        },
        {
          id: 'metricField2Id',
          name: 'metricField2Name',
          description: 'metricField2Description',
          type: FieldType.PERCENT,
          concept: ConceptType.METRIC,
        },
      ],
    },
    tables: {
      [TableType.DEFAULT]: [
        ['dimensions', 'dimensions', 'metrics', 'metrics'],
        ['1', false, 1, 0.01],
        ['2', true, 2, 0.02],
      ],
      [TableType.COMPARISON]: [],
      [TableType.SUMMARY]: [],
    },
    style: {
      styleInnerId1: {
        defaultValue: '13',
        value: '12',
      },
      styleInnerId2: {
        defaultValue: '3',
        value: '4',
      },
    },
  };
  const actual: TableFormat = tableTransform(testMessage(2, 2, 2));
  expect(actual).toEqual(expected);
});

test('objectTransform works', () => {
  const expected: ObjectFormat = {
    fields: {
      dimensions: [
        {
          id: 'dimensionField1Id',
          name: 'dimensionField1Name',
          description: 'dimensionField1Description',
          type: FieldType.TEXT,
          concept: ConceptType.DIMENSION,
        },
        {
          id: 'dimensionField2Id',
          name: 'dimensionField2Name',
          description: 'dimensionField2Description',
          type: FieldType.BOOLEAN,
          concept: ConceptType.DIMENSION,
        },
      ],
      metrics: [
        {
          id: 'metricField1Id',
          name: 'metricField1Name',
          description: 'metricField1Description',
          type: FieldType.NUMBER,
          concept: ConceptType.METRIC,
        },
        {
          id: 'metricField2Id',
          name: 'metricField2Name',
          description: 'metricField2Description',
          type: FieldType.PERCENT,
          concept: ConceptType.METRIC,
        },
      ],
    },
    tables: {
      [TableType.DEFAULT]: [
        {
          dimensions: ['1', false],
          metrics: [1, 0.01],
        },
        {
          dimensions: ['2', true],
          metrics: [2, 0.02],
        },
      ],
      [TableType.COMPARISON]: [],
      [TableType.SUMMARY]: [],
    },
    style: {
      styleInnerId1: {
        defaultValue: '13',
        value: '12',
      },
      styleInnerId2: {
        defaultValue: '3',
        value: '4',
      },
    },
  };
  const actual: ObjectFormat = objectTransform(testMessage(2, 2, 2));
  expect(actual).toEqual(expected);
});
