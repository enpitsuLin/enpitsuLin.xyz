import CMS from 'netlify-cms-app';
import { TagControl, TagPreview } from './widgets/TagWidget';
CMS.registerWidget('tags', TagControl, TagPreview);
