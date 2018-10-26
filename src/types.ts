export interface PostMessage extends MessageEvent {
  data: Message;
}

export interface Message {
  /**
   * The message type.
   */
  type: MessageType;
  /**
   * The configuration state of the component.
   */
  config: Config;
  /**
   * A list of all user selected fields.
   */
  fields: Field[];
  /**
   * The data corresponding to the data config state of the component.
   */
  dataResponse: DataResponse;
}

export interface Config {
  /**
   * The data config defined for the component.
   */
  data: ConfigData[];
  /**
   * The style elements required and supported by the component.
   */
  style: ConfigStyle[];
  themeStyle?: ConfigThemeStyle;
}

export interface Field {
  /**
   * The ID of the field.
   */
  id: FieldId;
  /**
   * The user-friendly name of the field.
   */
  name: string;
  /**
   * The user-friendly description of the field.
   */
  description: string;
  /**
   * The field type.
   */
  type: FieldType;
  /**
   * The field concept.
   */
  concept: ConceptType;
}

export enum ConceptType {
  METRIC = 'METRIC',
  DIMENSION = 'DIMENSION',
}

export interface DataResponse {
  /**
   * The list of tables for the current data configuration.
   */
  tables: Table[];
}

export enum MessageType {
  RENDER = 'RENDER',
}

export interface ConfigData {
  /**
   * The ID of the data section.
   *
   * This should be a non-empty string with no spaces.
   */
  id: ConfigDataId;
  /**
   * The label for the data section.
   */
  label: string;
  /**
   * The data elements to render.
   */
  elements: ConfigDataElement[];
}
export interface ConfigStyle {
  /**
   * The ID of the style section.
   */
  id: ConfigStyleId;
  /**
   * The heading for the style section.
   */
  label: string;
  /**
   * The style elements to render.
   */
  elements: ConfigStyleElement[];
}

export interface ConfigThemeStyle {
  fillColor: {
    color: string;
    opacity: number;
  };
  fontColor: {
    color: string;
    opacity: number;
  };
  accentFillColor: {
    color: string;
    opacity: number;
  };
  accentFontColor: {
    color: string;
    opacity: number;
  };
  fontFamily: string;
  accentFontFamily: string;
  increaseColor: {
    color: string;
    opacity: number;
  };
  decreaseColor: {
    color: string;
    opacity: number;
  };
  gridColor: {
    color: string;
    opacity: number;
  };
  seriesColor: Array<{
    color: string;
    opacity: number;
  }>;
}

export enum FieldType {
  YEAR = 'YEAR',
  YEAR_QUARTER = 'YEAR_QUARTER',
  YEAR_MONTH = 'YEAR_MONTH',
  YEAR_WEEK = 'YEAR_WEEK',
  YEAR_MONTH_DAY = 'YEAR_MONTH_DAY',
  YEAR_MONTH_DAY_HOUR = 'YEAR_MONTH_DAY_HOUR',
  QUARTER = 'QUARTER',
  MONTH = 'MONTH',
  WEEK = 'WEEK',
  MONTH_DAY = 'MONTH_DAY',
  DAY_OF_WEEK = 'DAY_OF_WEEK',
  DAY = 'DAY',
  HOUR = 'HOUR',
  MINUTE = 'MINUTE',
  DURATION = 'DURATION',
  COUNTRY = 'COUNTRY',
  COUNTRY_CODE = 'COUNTRY_CODE',
  CONTINENT = 'CONTINENT',
  CONTINENT_CODE = 'CONTINENT_CODE',
  SUB_CONTINENT = 'SUB_CONTINENT',
  SUB_CONTINENT_CODE = 'SUB_CONTINENT_CODE',
  REGION = 'REGION',
  REGION_CODE = 'REGION_CODE',
  CITY = 'CITY',
  CITY_CODE = 'CITY_CODE',
  METRO_CODE = 'METRO_CODE',
  LATITUDE_LONGITUDE = 'LATITUDE_LONGITUDE',
  NUMBER = 'NUMBER',
  PERCENT = 'PERCENT',
  TEXT = 'TEXT',
  BOOLEAN = 'BOOLEAN',
  URL = 'URL',
  IMAGE = 'IMAGE',
  CURRENCY_AED = 'CURRENCY_AED',
  CURRENCY_ALL = 'CURRENCY_ALL',
  CURRENCY_ARS = 'CURRENCY_ARS',
  CURRENCY_AUD = 'CURRENCY_AUD',
  CURRENCY_BDT = 'CURRENCY_BDT',
  CURRENCY_BGN = 'CURRENCY_BGN',
  CURRENCY_BOB = 'CURRENCY_BOB',
  CURRENCY_BRL = 'CURRENCY_BRL',
  CURRENCY_CAD = 'CURRENCY_CAD',
  CURRENCY_CDF = 'CURRENCY_CDF',
  CURRENCY_CHF = 'CURRENCY_CHF',
  CURRENCY_CLP = 'CURRENCY_CLP',
  CURRENCY_CNY = 'CURRENCY_CNY',
  CURRENCY_COP = 'CURRENCY_COP',
  CURRENCY_CRC = 'CURRENCY_CRC',
  CURRENCY_CZK = 'CURRENCY_CZK',
  CURRENCY_DKK = 'CURRENCY_DKK',
  CURRENCY_DOP = 'CURRENCY_DOP',
  CURRENCY_EGP = 'CURRENCY_EGP',
  CURRENCY_ETB = 'CURRENCY_ETB',
  CURRENCY_EUR = 'CURRENCY_EUR',
  CURRENCY_GBP = 'CURRENCY_GBP',
  CURRENCY_HKD = 'CURRENCY_HKD',
  CURRENCY_HRK = 'CURRENCY_HRK',
  CURRENCY_HUF = 'CURRENCY_HUF',
  CURRENCY_IDR = 'CURRENCY_IDR',
  CURRENCY_ILS = 'CURRENCY_ILS',
  CURRENCY_INR = 'CURRENCY_INR',
  CURRENCY_IRR = 'CURRENCY_IRR',
  CURRENCY_ISK = 'CURRENCY_ISK',
  CURRENCY_JMD = 'CURRENCY_JMD',
  CURRENCY_JPY = 'CURRENCY_JPY',
  CURRENCY_KRW = 'CURRENCY_KRW',
  CURRENCY_LKR = 'CURRENCY_LKR',
  CURRENCY_LTL = 'CURRENCY_LTL',
  CURRENCY_MNT = 'CURRENCY_MNT',
  CURRENCY_MVR = 'CURRENCY_MVR',
  CURRENCY_MXN = 'CURRENCY_MXN',
  CURRENCY_MYR = 'CURRENCY_MYR',
  CURRENCY_NOK = 'CURRENCY_NOK',
  CURRENCY_NZD = 'CURRENCY_NZD',
  CURRENCY_PAB = 'CURRENCY_PAB',
  CURRENCY_PEN = 'CURRENCY_PEN',
  CURRENCY_PHP = 'CURRENCY_PHP',
  CURRENCY_PKR = 'CURRENCY_PKR',
  CURRENCY_PLN = 'CURRENCY_PLN',
  CURRENCY_RON = 'CURRENCY_RON',
  CURRENCY_RSD = 'CURRENCY_RSD',
  CURRENCY_RUB = 'CURRENCY_RUB',
  CURRENCY_SAR = 'CURRENCY_SAR',
  CURRENCY_SEK = 'CURRENCY_SEK',
  CURRENCY_SGD = 'CURRENCY_SGD',
  CURRENCY_THB = 'CURRENCY_THB',
  CURRENCY_TRY = 'CURRENCY_TRY',
  CURRENCY_TWD = 'CURRENCY_TWD',
  CURRENCY_TZS = 'CURRENCY_TZS',
  CURRENCY_UAH = 'CURRENCY_UAH',
  CURRENCY_USD = 'CURRENCY_USD',
  CURRENCY_UYU = 'CURRENCY_UYU',
  CURRENCY_VEF = 'CURRENCY_VEF',
  CURRENCY_VND = 'CURRENCY_VND',
  CURRENCY_YER = 'CURRENCY_YER',
  CURRENCY_ZAR = 'CURRENCY_ZAR',
}

export interface Table {
  /**
   * The type of the table.
   */
  id: TableType;
  /**
   * The [[FieldId]]s of the fields selected by the user.
   */
  fields: FieldId[];
  /**
   * The rows of data Values.
   */
  rows: Row[];
}

export interface ConfigDataElement {
  /**
   * The data element type to render.
   */
  type: ConfigDataElementType;
  /**
   * The ID of the data element.
   *
   * This should be a non-empty string with no spaces.
   */
  id: ConfigDataElementId;
  /**
   * The tooltip or label for the data element.
   */
  label: string;
  /**
   * The data options for the element.
   *
   * This is dependent on the [[ConfigDataElementType]] of the element.
   */
  options: DataElementOptions;
  /**
   * The list of [[FieldId]]s selected by the user.
   *
   * This is only defined if the [[ConfigElementType]] is `DIMENSION` or `METRIC`.
   */
  value: FieldId[];
}
export interface ConfigStyleElement {
  /**
   * The style element type to render.
   */
  type: ConfigStyleElementType;
  /**
   * The ID of the style element.
   *
   * This should be a non-empty string with no spaces.
   */
  id: ConfigStyleElementId;
  /**
   * The tooltip or label for the style element.
   *
   * This is the label text for a `CHECKBOX` element and the tooltip text for other elements.
   */
  label: string;
  /**
   * The default value for the style element.
   *
   * Invalid values will be ignored.
   */
  defaultValue: string;
  /**
   * The current value of the style element.
   */
  value: string;
}
export enum TableType {
  DEFAULT = 'DEFAULT',
  COMPARISON = 'COMPARISON',
  SUMMARY = 'SUMMARY',
}

/**
 * A row of values.
 *
 * The order of values corresponds to the order of the fields of all data element field objects.
 */
export type Row = RowValue[];

export enum ConfigDataElementType {
  /**
   * Renders a metric field element.
   */
  METRIC = 2,
  /**
   * Renders a dimension field element.
   */
  DIMENSION = 1,
  /**
   * Renders a sort field element.
   *
   * Sort has an order dropdown.
   */
  SORT = 'SORT',
  /**
   * Renders a dropdown that affects the maximum number of results returned.
   */
  MAX_RESULTS = 3,
}

export type DataElementOptions =
  | MetricOptions
  | DimensionOptions
  | SortOptions
  | MaxResultsOptions;

export enum ConfigStyleElementType {
  /**
   * Renders a text input box.
   */
  TEXTINPUT = 1,
  /**
   * A single select dropdown.
   */
  SELECT_SINGLE = 2,
  /**
   * Renders a checkbox.
   *
   * Default value: `false`
   */
  CHECKBOX = 3,
  /**
   * Renders the font color selector.
   *
   * Acceptable default values: HEX color value. E.g. `"#888888"`.
   *
   * Default value: `"#000"`.
   */
  FONT_COLOR = 4,
  /**
   * Renders the font size selector.
   *
   * Default value: `"14px"`.
   */
  FONT_SIZE = 5,
  /**
   * Renders the font family selector.
   *
   * Default value: `""`
   */
  FONT_FAMILY = 6,
  /**
   * Renders a fill color selector.
   *
   * Acceptable default values: HEX color value.
   */
  FILL_COLOR = 7,
  /**
   * Renders a border color selector.
   *
   * Acceptable default values: HEX color value.
   */
  BORDER_COLOR = 8,
  /**
   * Renders an axis color selector.
   *
   * Acceptable default values: HEX color value.
   */
  AXIS_COLOR = 9,
  /**
   * Renders a grid color selector.
   *
   * Acceptable default values: HEX color value.
   */
  GRID_COLOR = 10,
  /**
   * Renders an opacity selector.
   */
  OPACITY = 11,
  /**
   * Renders a line weight picker.
   */
  LINE_WEIGHT = 12,
  /**
   * Renders a line style picker.
   *
   * Acceptable default values: `"solid"`, `"dashed"`, `"dotted"`, or `"double"`.
   */
  LINE_STYLE = 13,
  /**
   * Renders a border radius selector.
   */
  BORDER_RADIUS = 14,
  /**
   * Renders an interval selector.
   */
  INTERVAL = 15,
  /**
   * Renders a radio select with pre-defined values.
   */
  SELECT_RADIO = 16,
}

export interface MetricOptions {
  /**
   * The minimum number of metrics supported.
   */
  min: number;
  /**
   * The maximum number of metrics supported.
   */
  max: number;
}

export interface DimensionOptions {
  /**
   * The minimum number of dimensions supported.
   */
  min: number;
  /**
   * The maximum number of dimensions supported.
   */
  max: number;
  supportedTypes: FieldType[];
}

export interface SortOptions {
  /**
   * `"DESC"` for descending, `"ASC"` for ascending.
   */
  defaultOrder: 'DESC' | 'ASC';
}

export interface MaxResultsOptions {
  /**
   * The maximum number of rows.
   */
  max: number;
}

// Aliases
export type FieldId = string;
export type ConfigDataId = string;
export type ConfigStyleId = string;
export type ConfigDataElementId = string;
export type ConfigStyleElementId = string;

// Custom types for Library
export interface ParsedImage {
  originalUrl: string;
  proxiedUrl?: string;
  altText?: string;
}

export interface FieldsById {
  // An indexed Type cannot be a type alias :(
  [fieldId: string]: Field;
}

export type ParsedRow = ParsedRowValue[];

export interface RowByConfigId {
  [configId: string]: ParsedRow;
}

export interface TablesByType {
  [TableType.DEFAULT]: RowByConfigId[];
  [TableType.COMPARISON]: RowByConfigId[];
  [TableType.SUMMARY]: RowByConfigId[];
}

export type ParsedRowValue = string | number | boolean | ParsedImage;

export type RowHeading = string;
export type RowEntry = string | number | boolean;
export type RowValue = RowHeading | RowEntry;

export interface FieldsByConfigId {
  [configId: string]: Field[];
}

export type StyleTheme = any;
export type StyleEntry = any;
export type StyleValue = StyleTheme | StyleEntry;

export interface StyleById {
  [styleId: string]: StyleValue;
}

export interface TableTables {
  [TableType.DEFAULT]: RowValue[][];
  [TableType.COMPARISON]: RowValue[][];
  [TableType.SUMMARY]: RowValue[][];
}

export interface TableFormat {
  fields: FieldsByConfigId;
  style: StyleById;
  tables: TableTables;
}

export type TableTransform = (message: Message) => TableFormat;

export type ConfigId = string;

export interface SubscriptionsOptions<T> {
  transform: (message: Message) => T;
}

export interface ObjectRow {
  [configId: string]: RowEntry[];
}

export interface ObjectTables {
  [TableType.DEFAULT]: ObjectRow[];
  [TableType.COMPARISON]: ObjectRow[][];
  [TableType.SUMMARY]: ObjectRow[][];
}

export interface ObjectFormat {
  fields: FieldsByConfigId;
  style: StyleById;
  tables: ObjectTables;
}

export type ObjectTransform = (message: Message) => ObjectFormat;
