import { BlockHTMLConfig } from './types';
import { textHtmlConfig } from '@/lib/components/configs/text';
import { buttonHtmlConfig } from '@/lib/components/configs/button';
import { imageHtmlConfig } from '@/lib/components/configs/image';
import { dividerHtmlConfig } from '@/lib/components/configs/divider';
import { spacerHtmlConfig } from '@/lib/components/configs/spacer';
import { socialHtmlConfig } from '@/lib/components/configs/social';
import { columnsHtmlConfig } from '@/lib/components/configs/columns';
import { listHtmlConfig } from '@/lib/components/configs/list';



export const blockHtmlConfigs = {
  text: textHtmlConfig as BlockHTMLConfig,
  button: buttonHtmlConfig as BlockHTMLConfig,
  image: imageHtmlConfig as BlockHTMLConfig,
  divider: dividerHtmlConfig as BlockHTMLConfig,
  spacer: spacerHtmlConfig as BlockHTMLConfig,
  social: socialHtmlConfig as BlockHTMLConfig,
  columns: columnsHtmlConfig as BlockHTMLConfig,
  list: listHtmlConfig as BlockHTMLConfig,
}; 