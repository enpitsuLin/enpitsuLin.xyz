# 博客源文件|Source of github page blog

The source file here and the generated page file is in the master branch.
这里存放的是我的blog的源文件，生成的页面文件在master分支。
****
如果从一个新的运行环境中进行更新文章 请 安装 `git` 和 `node.js` 
##安装 Git
Windows：下载并安装 git.
Mac：使用 Homebrew, MacPorts ：brew install git;或下载 安装程序 安装。
Linux (Ubuntu, Debian)：
``shell
sudo apt-get install git-core
``
Linux (Fedora, Red Hat, CentOS)：``shell
sudo yum install git-core
``


##安装 Node.js
安装 Node.js 的最佳方式是使用 nvm。
cURL:
``shell
$ curl https://raw.github.com/creationix/nvm/v0.33.11/install.sh | sh
``
Wget:
``shell
$ wget -qO- https://raw.github.com/creationix/nvm/v0.33.11/install.sh | sh
``
安装完成后，重启终端并执行下列命令即可安装 Node.js。
``shell
$ nvm install stable
``
或者您也可以下载 [安装程序](https://nodejs.org/en/) 来安装。


##安装 Hexo
所有必备的应用程序安装完成后，即可使用 npm 安装 Hexo。
``shell
$ npm install -g hexo-cli
``

保证上述软件完成安装后，再对该仓库的**source分支**进行clone或下载解压，在确定**package.json**完整的情况下，然后在根目录下执行

``shell
$ npm install
``
然后开始享受写作XD