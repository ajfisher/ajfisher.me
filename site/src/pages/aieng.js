import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';

import PageHead from '../components/page-head';
import Layout from '../components/post-layout';

export const Head = () => {
  return (
    <>
      <PageHead
        title="AI Engineering | ajfisher"
        description="Information for software engineers using AI agents"
        type="article"
      />
    </>
  );
};


const AIEngPage = ({data}) => {
  const { featureimage } = data?.headimage?.nodes[0];

  const featuredImage = featureimage || null;

  const title = 'Resources, materials and links for AI coding agents';
  const slug = '/aieng';
  const date = '2025-09-12 14:00:00+1000';
  const excerpt = `Slides, links and other resources you might find useful in
    for scaling AI Code agent usage in engineering teams.`;
  const tags = ['thinking', 'business', 'innovation', 'ai', 'development'];

  const frontmatter = {
    title,
    date,
    excerpt,
    slug,
    large_title: false,
  };

  return (
    <Layout frontmatter={frontmatter} tags={tags}
      path='/aieng' featuredimage={featuredImage}
    >
      <PageHead title={title}/>
      <section className="content">
        <p>Thanks for attending my recent talk. Below you&apos;ll find some resources
          that I think may be helpful as it relates to scaling Code Agent use
          in your engineering team.</p>

        <h3>Survey: understanding AI usage in engineering teams</h3>

        <p>I&apos;m currently doing some research on how engineering teams are
          using AI in practice today. If you have a few minutes to fill out a
          <a href="https://tally.so/r/3xW4gv"> quick survey</a> I would really
          appreciate it. I will share the results back to the community when
          they are ready.</p>

        <h3>Talk slides and notes</h3>

        <p>You can view the slides from my talk below, or alternatively <a
          href="https://aieng.ajf.io/">visit the site</a> for the large
          version.</p>

        <p className="mediacontainer"><iframe title="AI Engineering Slides"
          src="https://aieng.ajf.io/?embed"></iframe></p>

        <p>Slides from my talk at Web Directions AI Engineering 2025, including
          notes, are <a
            href="https://aieng.ajf.io/static/scaling_coding_agents.pdf">available here for
          download (PDF 47MB)</a>.</p>

        <h3>Resources</h3>

        <p>These are some resources that I&apos;ve found that have been genuinely
          helpful. If you come across something you think should be on here then
          please reach out to me and let me know</p>

        <h4>Coding agents (non exhaustive)</h4>
        <p>
          <ul>
            <li><a href="https://www.anthropic.com/claude-code">Claude Code</a></li>
            <li><a href="https://openai.com/codex/">Open AI Codex</a></li>
            <li><a href="https://cloud.google.com/gemini/docs/codeassist/gemini-cli">Gemini CLI</a></li>
            <li><a href="https://docs.github.com/en/copilot/concepts/coding-agent/coding-agent">Github Copilot Coding Agent</a></li>
            <li><a href="https://www.atlassian.com/solutions/devops/ai-innovation">Atlassian Rovo Dev agent</a></li>
            <li><a href="https://cursor.com/en">Cursor IDE (in agent mode)</a></li>
            <li><a href="https://aider.chat/">Aider</a></li>
          </ul>
        </p>

        <h4>Documentation and context for agents</h4>
        <p>
          <ul>
            <li>Focus on your <a href="https://devcenter.upsun.com/posts/why-your-readme-matters-more-than-ai-configuration-files/">README file first and foremost</a>, even for agents</li>
            <li>Have one agents file, even with multiple tools working on the
              repo - <a href="https://agents.md/">Agents.md</a></li>
            <li>How <a href="https://medium.com/lifefunk/documentation-driven-development-how-good-docs-become-your-ai-pair-programming-superpower-e0e574db2f3b">documentation supports </a>
              better pair programming with code agents and assistants</li>
          </ul>
        </p>

        <h4>Monorepo strategies and structure</h4>
        <p>
          <ul>
            <li><a href="https://javascript.plainenglish.io/still-managing-multiple-repos-heres-the-frontend-monorepo-guide-you-actually-need-4d160880ec5c">Monorepo</a> set up in 2025</li>
            <li><a href="https://medium.com/@julakadaredrishi/monorepos-a-comprehensive-guide-with-examples-63202cfab711">Structural approaches and examples</a> for monorepo setup</li>
          </ul>
        </p>

        <h4>Agent Parallelisation</h4>
        <p>
          <ul>
            <li><a href="https://medium.com/@codecentrevibe/claude-code-multi-agent-parallel-coding-83271c4675fa">Testing parallelism and sub tasking agents</a> in Claude Code</li>
            <li>Methods of running multiple agents
              <a href="https://ainativedev.io/news/how-to-parallelize-ai-coding-agents">in parallel locally and cloud based</a></li>
            <li>Practical breakdown of <a href="https://dev.to/bredmond1019/multi-agent-orchestration-running-10-claude-instances-in-parallel-part-3-29da">orchestrating multiple tasks in parallel</a> using Claude Code</li>
          </ul>
        </p>

        <h4>Guardrails, review and workflow automation</h4>
        <p>
          <ul>
            <li>How to use <a href="https://github.blog/ai-and-ml/generative-ai/automate-your-project-with-github-models-in-actions/">LLMs in GH actions to validate changes</a> or add new workflows</li>
            <li>Using LLMs as <a href="https://medium.com/@billcava/terminal-ai-how-llm-changed-my-workflow-71ef97ddab5b">part of basic CLI commands</a> (uses Simon Willison’s LLM project)</li>
            <li>Similar approach with <a href="https://harper.blog/2024/03/11/use-an-llm-to-automagically-generate-meaningful-git-commit-messages/">LLM tool to build meaningful commit messages</a> on the fly</li>
            <li>Great view of <a href="https://blog.gitguardian.com/automated-guard-rails-for-vibe-coding">defence in depth</a> and multiple ways to set it up at local and remote levels to create good guardrails</li>
            <li>Research paper suggesting ways to build in <a href="https://arxiv.org/abs/2505.03574">real-time analysis and defence for coding agents</a> to mitigate risk (LlamaFirewall)</li>
            <li><a href="https://dev.to/aws-builders/common-security-pitfalls-using-vibe-coding-264b">Recommendation checklists on validation flows</a> needed for agent produced code (especially vibe coding scenarios but applies more generally too)</li>
            <li>Silly but fun way to <a href="https://worksonmymachine.ai/p/make-reviewing-ai-output-fun">make code reviewing fun by generating images</a></li>
            <li>A detailed case study showing how <a href="https://taylor.town/diggit-000">Claude Code was used to build a real tool with minimal prompts</a>, including lessons on planning, scaffolding, and vibing through development</li>
          </ul>
        </p>

        <h4>Good practices and documentation (from toolmakers)</h4>
        <p>
          <ul>
            <li><a href="https://www.anthropic.com/engineering/claude-code-best-practices">Best practice approaches on using Claude Code</a></li>
            <li><a href="https://developers.openai.com/codex/cloud">Working with Open AI Codex</a></li>
            <li><a href="https://github.com/google-gemini/gemini-cli?tab=readme-ov-file#-documentation">Gemini CLI live documentation</a></li>
            <li><a href="https://codelabs.developers.google.com/gemini-cli-hands-on#0">Gemini CLI code lab</a></li>
            <li><a href="https://aider.chat/docs/usage/tips.html">Tips for working with Aider</a></li>
            <li><a href="https://docs.github.com/en/copilot/tutorials/coding-agent/get-the-best-results">Using Github Copilot agent to work on tasks</a></li>
          </ul>
        </p>

        <h4>Other miscellaneous references</h4>
        <p>
          <ul>
            <li>A full, free book on <a href="https://docs.google.com/document/d/1rsaK53T3Lg5KoGwvf8ukOUvbELRtH-V0LnOIFDxBryE/edit?tab=t.0">Agentic Design Patterns</a> by Antonio Gulli (424 pages on how to build with agents)</li>
            <li>Good article about <a href="https://levelup.gitconnected.com/license-to-kill-coding-with-cursor-ai-agents-1df3d6a0bfe8">coding with cursor in assistive and agent modes</a></li>
            <li>Useful walk through of using all of <a href="https://github.blog/ai-and-ml/github-copilot/from-idea-to-pr-a-guide-to-github-copilots-agentic-workflows/">Github’s tooling across multiple workflows</a> to show how different parts fit together</li>
          </ul>
        </p>

        <h4>Where to next?</h4>
        <p>If you got this far then thanks for reading and a reminder about the
          <a href="https://tally.so/r/3xW4gv"> survey</a> I&apos;m running to
          understand how teams are using AI in practice today. It only take a few
          minutes and I would really appreciate it.</p>
        <p>The <Link to="/">home page</Link> will give you featured
          articles and recent posts.</p>
        <p>You can also check out <Link to="/blog">the full
          list of articles</Link> that have ever been published.</p>

      </section>
    </Layout>
  );
};

AIEngPage.propTypes = {
  data: PropTypes.shape({
    headimage: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          featureimage: PropTypes.any,
        })
      ).isRequired,
    }).isRequired,
  }).isRequired,
};

export default AIEngPage;

export const pageQuery = graphql`
  query {
    headimage: allImageSharp(
      filter: {original: {
        src: {regex: "/goldfish/"}
      }}
    ) {
      nodes {
        id
        featureimage: gatsbyImageData(layout: FULL_WIDTH)
      }
    }
  }
`;
