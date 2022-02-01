import CMS from 'netlify-cms-app';
import { TagControl, TagPreview } from './widgets/TagWidget';
import * as cn from 'netlify-cms-locales/dist/esm/zh_Hans';
CMS.registerWidget('tags', TagControl, TagPreview);
CMS.registerLocale('cn', cn);
