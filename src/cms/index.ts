import CMS from 'netlify-cms-app';
import { TagControl, TagPreview } from './widgets/TagWidget';
import { zh_Hans as cn } from 'netlify-cms-locales';
CMS.registerWidget('tags', TagControl, TagPreview);
CMS.registerLocale('cn', cn);
