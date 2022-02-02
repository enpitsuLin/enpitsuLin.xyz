import CMS from 'netlify-cms-app';
import { TagControl, TagPreview } from './widgets/TagWidget';
import zh_Hans from 'netlify-cms-locales/dist/esm/zh_Hans';
CMS.registerWidget('tags', TagControl, TagPreview);
CMS.registerLocale('cn', zh_Hans);
