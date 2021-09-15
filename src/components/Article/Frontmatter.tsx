import React, { FunctionComponent } from 'react';
import { FaCalendar, FaTags, FaFileSignature, FaStopwatch } from 'react-icons/fa';
import { calcArticleWordCount, navigateToSearchPage } from '@/utils/article';
import FrontMatterItem from './ArticleToc/FrontmatterItem';
import { Box } from '@chakra-ui/layout';
import { Tag } from '@chakra-ui/tag';
import { useColorModeValue } from '@chakra-ui/color-mode';

type Props = {
  article: GatsbyTypes.MarkdownRemark;
};

const Frontmatter: FunctionComponent<Props> = ({ article }) => {
  const frontmatter = article.frontmatter;
  const timeToRead = article.timeToRead;
  const words = calcArticleWordCount(article);

  const { date, tags } = frontmatter as GatsbyTypes.Frontmatter;

  const TagHoverBg = useColorModeValue('#0003', '#fff3');
  return (
    <Box py={2} fontSize="x-small">
      <FrontMatterItem icon={FaTags}>
        {tags?.map(tag => (
          <Tag
            key={tag}
            cursor="pointer"
            mr="0.5"
            size="sm"
            _hover={{ bg: TagHoverBg }}
            onClick={() => {
              navigateToSearchPage(tag as string);
            }}
          >
            {tag}
          </Tag>
        ))}
      </FrontMatterItem>
      <FrontMatterItem icon={FaCalendar} label={date} />
      <FrontMatterItem icon={FaFileSignature} label={`${words}字`} />
      <FrontMatterItem icon={FaStopwatch} label={`可能需要${timeToRead}分钟阅读`} />
    </Box>
  );
};

export default Frontmatter;
