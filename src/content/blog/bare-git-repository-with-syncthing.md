---
title: Bare git repository was best friend with Syncthing
date: 2023-02-18 15:45:00
tags: [Git, Syncthing]
lang: en
excerpt: Synchronizing files and managing code can be simplified by using a bare Git repository with Syncthing instead of installing syncthing in WSL. By checking out a copy of the repository in WSL, files and code can be seamlessly synchronized across both environments without dealing with associated issues.
---

I encountered issues using Syncthing and WSL together. Previously, I used Syncthing to sync files (mainly code) that I needed across multiple locations. But when I switched to WSL as my primary dev environment, I faced some challenges. In this post, I will discuss these issues and how I resolved them.

## Syncthing Issues with WSL

Syncthing is a continuous file sync program that supports Linux, so it is easy to use in WSL. But, there are a few issues to consider.

1. I already installed Syncthing on Windows, so I didn't need to install it again on WSL.
2. Configuring a scheduled task to make programs in WSL run at startup can be a hassle.
3. Permission issues can cause problems with Syncthing when operating on each other's files between the WSL and Windows file systems.

Therefore, I am exploring other options available.

## What is a git repository?

Usually, when we create a repository with git init in our work directories, there are two things:

1. A `.git` subfolder that stores the repository's metadata and all information related to the repository's version control system, such as commits and branches.
2. An empty working directory: This is the directory where you store the actual files and directories that make up your project. Git uses this directory to keep track of changes to the files and to create new commits.

Repositories created with git init --bare are called bare repos.

In a bare Git repository, metadata and the object database are stored in the root folder instead of a `.git` subfolder.

A Git bare repository does not have a working directory since it is intended to be a centralized repository that multiple developers can push changes to and pull changes from, without the need for a local working copy of the repository.

BINGO! A local centralized repository + Syncthing. I can use Syncthing in Windows to sync my code and files, and work on coding by checking out a copy of the local git bare repository in WSL.

## The benefits

Before using a Git bare repository, I needed to add ignore settings to the synced file configuration in Syncthing's web UI or edit `.stignore`, especially when syncing files directly in WSL. This is because I am Syncthing a single folder that contains all the files I need to sync.

This often resulted in unexpected files being synced to my intermediate sync server, including some large files. But by using a bare Git repository as an aid, I am able to easily manage different file ignore rules in each folder with `.gitignore`.

## Conclusion

Using a bare Git repository with Syncthing is an effective way to avoid running Syncthing in WSL. By checking out a copy of the repository in WSL, I can seamlessly sync my code and files across both environments with Syncthing. This eliminates the need for installing Syncthing in WSL and dealing with the associated issues.

In conclusion, leveraging the power of Git and Syncthing together can simplify the file sync and code management process in a cross-platform environment.

## Related

- [Git bare repository](https://git-scm.com/book/en/v2/Git-on-the-Server-Getting-Git-on-a-Server)
- [Ignoring files in Git](https://git-scm.com/docs/gitignore)
- [Syncthing ignoring-files](https://docs.syncthing.net/users/ignoring.html#ignoring-files)
