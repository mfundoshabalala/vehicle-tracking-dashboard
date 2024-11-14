/* eslint-disable @typescript-eslint/no-explicit-any */
interface HeadersRows {
  headers: string[];
  rows: any[][];
}

function convertFromCamelToNormal(str: string): string {
  return str.replace(/([A-Z])/g, ' $1').toLowerCase();
}

function getJSONHeaders(data: Record<string, any>[]): string[] {
  return Object.keys(data[0]).map((key) => convertFromCamelToNormal(key));
}

function getJSONRows(data: Record<string, any>[]): any[][] {
  return data.map((row) => {
    return Object.values(row).map((value) => {
      if (typeof value === 'object') {
        return value ? Object.values(value) : value;
      } else {
        return value;
      }
    });
  });
}

export function getJSONHeadersAndRows(data: Record<string, any>[]): HeadersRows {
  return {
    headers: getJSONHeaders(data),
    rows: getJSONRows(data)
  };
}


