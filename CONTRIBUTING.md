# Contributing to Online Clothing Shop

Thank you for your interest in contributing to Online Clothing Shop! We welcome contributions from the community to help make this project better. All contributions are valued, from bug reports to new features.

This guide will provide you with everything you need to know to contribute effectively.

## Table of Contents
- [Code of Conduct](#code-of-conduct)
- [How to Contribute](#how-to-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Enhancements](#suggesting-enhancements)
  - [Your First Code Contribution](#your-first-code-contribution)
- [Development Setup](#development-setup)
- [Making Changes: The Contribution Workflow](#making-changes-the-contribution-workflow)
  - [1. Create a Branch](#1-create-a-branch)
  - [2. Make Your Changes](#2-make-your-changes)
  - [3. Commit Your Changes](#3-commit-your-changes)
  - [4. Finalizing an Issue](#4-finalizing-an-issue)
- [Submitting Pull Requests](#submitting-pull-requests)
- [Coding Standards](#coding-standards)

## Code of Conduct

By participating in this project, you are expected to uphold our [Code of Conduct](CODE_OF_CONDUCT.md). Please be respectful and professional in all interactions.

## How to Contribute

### Reporting Bugs
If you find a bug, please open an issue using the "Bug report" template. Make sure to include as much detail as possible, including:
- A clear and descriptive title.
- Steps to reproduce the bug.
- What you expected to happen.
- What actually happened.
- Your environment details (OS, browser, etc.).

### Suggesting Enhancements
If you have an idea for a new feature or an improvement, please open an issue using the "Feature request" template. This allows for discussion before any code is written.

### Your First Code Contribution
Unsure where to begin? Look for issues tagged with `good first issue`. These are a great way to get started.

## Development Setup

1.  **Clone your fork** locally:
    ```bash
    git clone https://github.com/your-username/Online-Clothing-Shop.git
    cd Online-Clothing-Shop
    ```
2.  **Set up the development environment** by following the instructions in the `README.md` file.

## Making Changes: The Contribution Workflow

### 1. Create a Branch

Before you start writing code, create a new branch from `main`. The branch name should follow this convention: `type/issue-number/short-description`.

-   **`type`**: `feature`, `bugfix`, `docs`, `refactor`, `test`, etc.
-   **`issue-number`**: The number of the issue you are addressing.
-   **`short-description`**: A few words describing the change.

**Example:**
If you are working on a new login feature for issue #42, your branch name would be:
```bash
git checkout -b feature/42/add-user-login
```

### 2. Make Your Changes
Make your code changes in your new branch. Ensure your code follows the project's [Coding Standards](#coding-standards).

### 3. Commit Your Changes

We use the **Conventional Commits** specification for our commit messages. This makes the commit history more readable and helps with automating changelogs.

Each commit message should have the following format:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

-   **`type`**: `feat` (new feature), `fix` (bug fix), `docs` (documentation), `style` (formatting), `refactor`, `test`, `chore` (build process, etc.).
-   **`description`**: A short summary of the change in the present tense.

**Example commit:**
```bash
git commit -m "feat: add user authentication endpoint"
```

### 4. Finalizing an Issue
When you are ready to finalize an issue, link your commit to the issue. This can be done by adding a keyword to your commit message. This will automatically close the issue when the commit is merged into `main`.

**Example:**
```bash
git commit -m "feat: implement user login form
>
> Adds the UI and form handling for user login.
>
> Closes #42"
```
This commit for issue #42 will close it upon merging.

## Submitting Pull Requests

Once your changes are committed, you are ready to create a Pull Request (PR).

1.  **Push your branch** to your fork:
    ```bash
    git push origin feature/42/add-user-login
    ```
2.  **Open a Pull Request** from your fork to the `main` branch of the original repository.
3.  **Fill out the PR template** with a clear description of your changes.
    -   Reference the issue(s) your PR addresses.
    -   Include screenshots or GIFs for any UI changes.
    -   Explain your changes and why you made them.
4.  **Wait for review.** A project maintainer will review your PR. They may request changes. Address any feedback and push the changes to your branch. The PR will update automatically.

## Coding Standards

Please follow the coding standards outlined in the original `CONTRIBUTING.md` to ensure consistency across the codebase. These include guidelines for JavaScript, HTML, and CSS.

### Thank you for contributing to Online Clothing Shop!
