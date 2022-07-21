// TODO: create this file like a library and export it as a module of dependencies like aseprite package manager.
// with self repository as aseprite package manager.

const _WHITESPACE = Array.from({ length: 512 }, () => ' ').join('');
export class JSON {
  static stringify(data: unknown, indent?: string) {
    indent = typeof indent === 'string' ? indent : '';

    let str = '';

    if (
      typeof data === 'boolean' ||
      data === null ||
      data === undefined ||
      (typeof data === 'number' && (data === Infinity || data === -Infinity || isNaN(data) === true))
    ) {
      if (data === null) {
        str = indent + 'null';
      } else if (data === undefined) {
        str = indent + 'undefined';
      } else if (data === false) {
        str = indent + 'false';
      } else if (data === true) {
        str = indent + 'true';
      } else if (data === Infinity) {
        str = indent + 'Infinity';
      } else if (data === -Infinity) {
        str = indent + '-Infinity';
      } else if (isNaN(data) === true) {
        str = indent + 'NaN';
      }
    } else if (typeof data === 'number') {
      str = indent + data.toString();
    } else if (typeof data === 'string') {
      str = indent + '"' + data + '"';
    } else if (typeof data === 'function') {
      const body = data.toString().split('\n');
      let offset = 0;
      const eachInString = (string: string, character: string, index = 0): number => {
        if (string.length > 0 && index < string.length) {
          if (string[index] === character) {
            return eachInString(string, character, index + 1);
          }
        }
        return index + 1;
      };

      const first =
        body.find(function (ch) {
          return ch.startsWith('\t');
        }) || null;

      if (first !== null) {
        const check = eachInString(first, '\t');
        if (check !== null) {
          offset = Math.max(0, check - indent.length);
        }
      }

      for (let b = 0, bl = body.length; b < bl; b++) {
        const line = body[b];
        if (line.startsWith('\t')) {
          str += indent + line.substring(offset);
        } else {
          str += indent + line;
        }

        str += '\n';
      }
    } else if (typeof data === 'object' && Array.isArray(data as Array<unknown>)) {
      const is_primitive =
        (data as Array<unknown>).find(function (val) {
          return typeof data === 'object' || typeof val === 'function';
        }) === undefined;

      const dimension = Math.sqrt((data as Array<unknown>).length);
      const is_matrix = dimension === (dimension | 0);

      if ((data as Array<unknown>).length === 0) {
        str = indent + '[]';
      } else if (is_primitive === true && is_matrix === true) {
        let max = 0;

        for (let d = 0, dl = (data as Array<unknown>).length; d < dl; d++) {
          max = Math.max(max, (data as Array<any>)[d].toString().length);
        }

        str = indent;
        str += '[\n';

        for (let y = 0; y < dimension; y++) {
          str += '\t' + indent;

          for (let x = 0; x < dimension; x++) {
            const tmp = (data as Array<any>)[x + y * dimension].toString();
            if (tmp.length < max) {
              str += _WHITESPACE.substring(0, max - tmp.length + 1);
            }

            str += tmp;

            if (x < dimension - 1) {
              str += ', ';
            }
          }

          if (y < dimension - 1) {
            str += ',';
          }

          str += '\n';
        }

        str += indent + ']';
      } else if (is_primitive === true) {
        str = indent;
        str += '[';

        for (let d = 0, dl = (data as Array<unknown>).length; d < dl; d++) {
          if (d === 0) {
            str += ' ';
          }

          str += JSON.stringify((data as Array<unknown>)[d]);

          if (d < dl - 1) {
            str += ', ';
          } else {
            str += ' ';
          }
        }

        str += ']';
      } else {
        str = indent;
        str += '[\n';

        for (let d = 0, dl = (data as Array<unknown>).length; d < dl; d++) {
          str += JSON.stringify((data as Array<unknown>)[d], '\t' + indent);

          if (d < dl - 1) {
            str += ',';
          }

          str += '\n';
        }

        str += indent + ']';
      }
    } else if (typeof data === 'object') {
      const keys = Object.keys(data);
      if (keys.length === 0) {
        str = indent + '{}';
      } else {
        str = indent;
        str += '{\n';

        for (let k = 0, kl = keys.length; k < kl; k++) {
          const key = keys[k];

          str += '\t' + indent + '"' + key + '": ';
          str += JSON.stringify(data[key as keyof typeof data], '\t' + indent).trim();

          if (k < kl - 1) {
            str += ',';
          }

          str += '\n';
        }

        str += indent + '}';
      }
    }

    return str;
  }
}
