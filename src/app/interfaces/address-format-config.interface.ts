export interface FsAddressFormatConfig {
  name?: boolean,
  country?: boolean,
  region?: boolean,
  city?: boolean,
  street?: boolean,
  zip?: boolean,
  format?: string | 'twoline' | 'oneline',
  includeFirst?: number,
  disabled?: boolean,
  readonly?: boolean
}

export interface IFsAddressFormatConfig extends FsAddressFormatConfig {}

