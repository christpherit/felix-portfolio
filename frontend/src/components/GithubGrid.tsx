import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiStar, FiGitBranch, FiFolder, FiExternalLink } from 'react-icons/fi';
import axios from 'axios';

interface Repository {
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
}

export const GithubGrid: React.FC<{ username?: string }> = ({ username = 'felix-christopher' }) => {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Generate 52 weeks of mock contribution data with purple hues
  const generateContributionData = () => {
    const data = [];
    const now = new Date();
    // 52 weeks * 7 days = 364 days
    for (let i = 0; i < 364; i++) {
      const date = new Date(now.getTime() - (363 - i) * 24 * 60 * 60 * 1000);
      // random contributions count (skewed towards low to look realistic)
      const count = Math.random() > 0.35 ? Math.floor(Math.random() * 8) : 0;
      data.push({
        date: date.toISOString().split('T')[0],
        count,
        level: count === 0 ? 0 : count <= 2 ? 1 : count <= 5 ? 2 : 3,
      });
    }
    return data;
  };

  const contributionSquares = generateContributionData();

  useEffect(() => {
    if (!username) return;
    const fetchGithubData = async () => {
      try {
        setLoading(true);
        // Fetch public repositories sorted by updated date
        const response = await axios.get(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`
        );
        setRepos(response.data);
        setError(false);
      } catch (err) {
        console.error('Error fetching github data', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchGithubData();
  }, [username]);

  // Colors mapping for contribution levels
  const levelColors = [
    'bg-zinc-900 border border-zinc-800/40', // Level 0
    'bg-violet-950/40 border border-violet-900/50', // Level 1
    'bg-violet-800/60 border border-violet-700/60', // Level 2
    'bg-violet-500 border border-violet-400', // Level 3
  ];

  return (
    <div className="w-full space-y-12">
      {/* Heatmap Section */}
      <div className="glass-card p-6 md:p-8 rounded-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-zinc-800/80 pb-4">
          <div className="flex items-center gap-3">
            <FiGithub className="w-6 h-6 text-violet-400" />
            <div>
              <h3 className="text-lg font-bold text-zinc-100">Open Source Contributions</h3>
              <p className="text-xs text-zinc-400">Activity index tracking commits, pull requests, and reviews</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <span>Less</span>
            <div className="w-3 h-3 rounded-sm bg-zinc-900 border border-zinc-800" />
            <div className="w-3 h-3 rounded-sm bg-violet-950/40 border border-violet-900/50" />
            <div className="w-3 h-3 rounded-sm bg-violet-800/60 border border-violet-700/60" />
            <div className="w-3 h-3 rounded-sm bg-violet-500 border border-violet-400" />
            <span>More</span>
          </div>
        </div>

        {/* Heatmap Grid Wrapper */}
        <div className="overflow-x-auto w-full scrollbar-thin">
          <div className="grid grid-flow-col grid-rows-7 gap-1 min-w-[640px] py-2">
            {contributionSquares.map((day, idx) => (
              <div
                key={idx}
                className={`w-[10px] h-[10px] rounded-sm transition-all duration-300 hover:scale-125 ${
                  levelColors[day.level]
                } cursor-crosshair relative group`}
              >
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-zinc-950 border border-zinc-800 text-[10px] text-zinc-300 font-mono py-1 px-2 rounded shadow-xl whitespace-nowrap z-20 pointer-events-none">
                  {day.count === 0 ? 'No' : day.count} contributions on {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* GitHub Projects Grid */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-xl font-extrabold text-zinc-100 tracking-tight">Latest GitHub Repositories</h3>
            <p className="text-sm text-zinc-400">Dynamic repos directly from the GitHub API</p>
          </div>
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-violet-400 hover:text-violet-300 font-semibold border-b border-violet-400/20 hover:border-violet-300 transition-colors"
          >
            <span>View GitHub Profile</span>
            <FiExternalLink className="w-3 h-3" />
          </a>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, idx) => (
              <div key={idx} className="glass-card p-6 rounded-2xl animate-pulse space-y-4">
                <div className="h-4 bg-zinc-800 rounded w-2/3" />
                <div className="space-y-2">
                  <div className="h-3 bg-zinc-800 rounded w-full" />
                  <div className="h-3 bg-zinc-800 rounded w-5/6" />
                </div>
                <div className="h-4 bg-zinc-800 rounded w-1/3" />
              </div>
            ))}
          </div>
        ) : error ? (
          /* Fallback mock list in case GitHub rate limits fail the request */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FallbackRepoCard
              name="mern-saas-dashboard"
              description="A multi-tenant corporate management platform with JWT, Express, and React dashboard widgets."
              language="TypeScript"
              stars={48}
              forks={12}
              url={`https://github.com/${username}/mern-saas-dashboard`}
            />
            <FallbackRepoCard
              name="hasura-graphql-engine"
              description="GraphQL schema optimizations and Hasura event triggers setup for high-speed dynamic feeds."
              language="JavaScript"
              stars={32}
              forks={4}
              url={`https://github.com/${username}/hasura-graphql-engine`}
            />
            <FallbackRepoCard
              name="express-clean-architecture"
              description="Boilerplate for production Node APIs leveraging Helmet, Mongoose, MVC pattern, and unit test suites."
              language="TypeScript"
              stars={67}
              forks={19}
              url={`https://github.com/${username}/express-clean-architecture`}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repos.map((repo) => (
              <motion.a
                key={repo.name}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4 }}
                className="glass-card p-6 rounded-2xl flex flex-col justify-between hover:border-violet-500/20 transition-all duration-300"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-violet-400">
                    <FiFolder className="w-5 h-5" />
                    <h4 className="font-semibold text-zinc-100 truncate w-full hover:text-white transition-colors">
                      {repo.name}
                    </h4>
                  </div>
                  <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed">
                    {repo.description || 'No description provided. Click to view repository on GitHub.'}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-6 pt-4 border-t border-zinc-900 text-xs text-zinc-500">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-violet-500" />
                    {repo.language || 'HTML/CSS'}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <FiStar className="w-3.5 h-3.5" />
                      {repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <FiGitBranch className="w-3.5 h-3.5" />
                      {repo.forks_count}
                    </span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Fallback Repos mock template
const FallbackRepoCard: React.FC<{
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  url: string;
}> = ({ name, description, language, stars, forks, url }) => {
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -4 }}
      className="glass-card p-6 rounded-2xl flex flex-col justify-between hover:border-violet-500/20 transition-all duration-300"
    >
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-violet-400">
          <FiFolder className="w-5 h-5" />
          <h4 className="font-semibold text-zinc-100 truncate w-full">{name}</h4>
        </div>
        <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed">{description}</p>
      </div>

      <div className="flex items-center justify-between mt-6 pt-4 border-t border-zinc-900 text-xs text-zinc-500">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-violet-500" />
          {language}
        </span>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <FiStar className="w-3.5 h-3.5" />
            {stars}
          </span>
          <span className="flex items-center gap-1">
            <FiGitBranch className="w-3.5 h-3.5" />
            {forks}
          </span>
        </div>
      </div>
    </motion.a>
  );
};
