const VOID_TAGS = ['slider', 'file', 'shades', 'newrow', 'color'];
interface ComponentFromHTML {
  text?: string;
  comment?: string;
  children?: ComponentFromHTML[];
  tag?: string;
  attributes?: { [key: string]: string };
}

export const parseHTML = (input: string) => {
  const root: ComponentFromHTML = {
    children: [],
  };
  // eslint-disable-next-line @typescript-eslint/ban-types
  const pull = (regex: RegExp, handler: Function = (match: string) => match) => {
    const match = regex.exec(input);
    if (match !== null) {
      const [full_match, ...captures] = match;
      input = input.substring(full_match.length);
      handler(...captures);
      return true;
    } else {
      return false;
    }
  };
  const parse_content = (cursor: ComponentFromHTML) => {
    let run = true;
    while (run && input.length > 0) {
      // Parse the opening of a tag:
      const success =
        // eslint-disable-next-line no-useless-escape
        pull(new RegExp('^<([a-zA-Z][a-zA-Z0-9-]*)'), (tag: string) => {
          const new_tag = { tag, attributes: {}, children: [] };
          cursor.children?.push(new_tag);
          parse_attributes(new_tag);
          if (!VOID_TAGS.includes(tag.toLowerCase())) {
            parse_content(new_tag);
          }
        }) ||
        // Parse a comment node:
        pull(new RegExp('^<!--((?:[^-]|-(?!->))*)-->'), (comment: string) => {
          cursor.children?.push({
            comment,
          } as ComponentFromHTML);
        }) ||
        // Parse a closing tag
        // eslint-disable-next-line no-useless-escape
        pull(new RegExp('^<\/([a-zA-Z][a-zA-Z0-9\-]*)>'), (tag: string) => {
          if (cursor.tag?.toLowerCase() !== tag.toLowerCase()) {
            throw new Error("Closing tag doesn't match");
          }
          run = false;
        }) ||
        // Parse a text node
        pull(new RegExp('^([^<]+)'), (text: string) => {
          cursor.children?.push({
            text,
          } as ComponentFromHTML);
        });
      if (!success) {
        throw new Error('Parsing Error: No rules matched');
      }
    }
  };
  const parse_attributes = (cursor: ComponentFromHTML) => {
    while (
      // eslint-disable-next-line no-useless-escape
      pull(new RegExp('^\\s+([a-zA-Z][a-zA-Z0-9\-]+)="([^"]*)"'), (name: string, value: string) => {
        cursor.attributes ??= {};
        cursor.attributes[name] = value;
      })
    ) {
      continue;
    }
    if (!pull(new RegExp('^\\s*>/'))) {
      throw new Error('Malformed open tag');
    }
  };
  parse_content(root);
  return root.children;
};
