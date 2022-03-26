import React from "react";
import { Box, BoxProps, Icon } from "@chakra-ui/react";
import { FaQq, FaMailBulk, FaGithub, FaSteam, FaZhihu } from "react-icons/fa";

const contacts = [
  [FaQq, "http://wpa.qq.com/msgrd?v=3&uin=1092199651&site=qq&menu=yes", "QQ: 1092199651"],
  [FaMailBulk, "mailto://enpitsulin@gmail.com", "E-mail: enpitsulin@gmail.com"],
  [FaGithub, "https://github.com/enpitsulin", "GitHub: enpitsulin"],
  [FaSteam, "https://steamcommunity.com/profiles/76561198338250608/", "Steam: promise"],
  [FaZhihu, "https://zhihu.com/people/enpitsulin", "知乎：enpitsulin"]
] as Array<[React.ComponentType, string, string]>;

const Contacts: React.FC<BoxProps> = (props) => {
  return (
    <Box my={2} {...props}>
      {contacts.map((contact) => {
        const [icon, link, title] = contact;
        return (
          <a href={link} title={title} target="__blank" key={title}>
            <Icon
              as={icon}
              transition="transform 0.2s linear 0s"
              mr={4}
              h={6}
              w={6}
              _hover={{ transform: "scale(1.4)" }}
            />
          </a>
        );
      })}
    </Box>
  );
};

export default Contacts;
