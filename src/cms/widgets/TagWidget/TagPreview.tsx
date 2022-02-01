import { CmsWidgetPreviewProps } from 'netlify-cms-core';
import * as TagStyles from './TagPreview.module.css';

const TagPreview: React.FC<CmsWidgetPreviewProps<string[]>> = ({ value }) => {
  return (
    <ul className={TagStyles.tags}>
      {value.map((tag, index) => (
        <li className={TagStyles.tag} key={index}>
          {tag}
        </li>
      ))}
    </ul>
  );
};
export default TagPreview;
