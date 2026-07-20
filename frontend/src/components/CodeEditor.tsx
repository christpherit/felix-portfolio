import React, { useState } from 'react';
import { FiPlay, FiRefreshCw, FiTerminal, FiCode, FiCheck, FiFolder } from 'react-icons/fi';

interface CodeFile {
  name: string;
  language: string;
  code: string;
  output: string;
}

export const CodeEditor: React.FC = () => {
  const files: CodeFile[] = [
    {
      name: 'ResolveFeed.gql',
      language: 'graphql',
      code: `query GetEnterpriseProjects($limit: Int!) {
  projects(limit: $limit, order_by: { order: asc }) {
    id
    title
    category
    tech_stack
    github_url
    live_url
    featured
    metrics {
      lighthouse_score
      load_time_ms
    }
  }
}`,
      output: `✔ Schema fetched from Hasura GraphQL Engine.
✔ Server verified in 12ms.
{
  "data": {
    "projects": [
      { "id": "1", "title": "MERN Corporate SaaS", "category": "MERN" },
      { "id": "2", "title": "Hasura Admin Engine", "category": "GraphQL" }
    ]
  }
}`,
    },
    {
      name: 'Server.ts',
      language: 'typescript',
      code: `import express from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import cors from 'cors';

const app = express();
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());

// Enterprise MVC Routing
import projectRoutes from './routes/projectRoutes.js';
app.use('/api/projects', projectRoutes);

const PORT = process.env.PORT || 5000;
await mongoose.connect(process.env.MONGO_URI);
app.listen(PORT, () => console.log(\`Server active on port \${PORT}\`));`,
      output: `[nodemon] starting \`ts-node server.ts\`
✔ MongoDB Atlas Connection Established.
✔ Middleware security profiles loaded (Helmet: Active, Rate-Limiting: Active).
✔ Port 5000 listening... ready for connections.`,
    },
    {
      name: 'Portfolio.tsx',
      language: 'typescript',
      code: `import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="relative text-center px-4"
    >
      <h1 className="text-6xl font-extrabold tracking-tight">
        Christopher Felix
      </h1>
      <p className="text-xl text-zinc-400 mt-4">
        Full Stack Developer
      </p>
    </motion.div>
  );
};`,
      output: `✔ Bundling via Vite... compiled successfully in 142ms.
✔ CSS custom properties loaded (Tailwind v4 theme active).
✔ Hot Module Replacement (HMR) active.`,
    },
  ];

  const [activeFileIdx, setActiveFileIdx] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [showOutput, setShowOutput] = useState(false);

  const activeFile = files[activeFileIdx];

  const handleRun = () => {
    setIsRunning(true);
    setShowOutput(false);
    setTimeout(() => {
      setIsRunning(false);
      setShowOutput(true);
    }, 1200);
  };

  const handleReset = () => {
    setShowOutput(false);
    setIsRunning(false);
  };

  return (
    <div className="w-full glass-panel rounded-2xl border border-zinc-800/80 shadow-2xl overflow-hidden text-left flex flex-col font-mono text-xs select-none">
      {/* Editor Title Bar */}
      <div className="bg-zinc-950/80 px-4 py-3 border-b border-zinc-900 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Mac style control dots */}
          <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
          <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
          <span className="text-[11px] text-zinc-500 ml-3 flex items-center gap-1.5">
            <FiFolder className="w-3 h-3" /> workspace / portfolio
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleRun}
            disabled={isRunning}
            className={`flex items-center gap-1 px-2.5 py-1 rounded bg-violet-600 hover:bg-violet-500 active:scale-95 text-white font-medium cursor-pointer transition-all disabled:opacity-50`}
          >
            {isRunning ? (
              <FiRefreshCw className="w-3 h-3 animate-spin" />
            ) : (
              <FiPlay className="w-3 h-3 fill-current" />
            )}
            <span>{isRunning ? 'Running...' : 'Run Code'}</span>
          </button>
          <button
            onClick={handleReset}
            className="p-1 text-zinc-500 hover:text-zinc-300 transition-colors"
            title="Reset Terminal"
          >
            <FiRefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Editor Content Area */}
      <div className="flex flex-col md:flex-row h-[340px] divide-y md:divide-y-0 md:divide-x divide-zinc-900">
        {/* Sidebar Tabs */}
        <div className="w-full md:w-44 bg-zinc-950/40 py-2 flex md:flex-col overflow-x-auto md:overflow-x-visible">
          {files.map((file, idx) => (
            <button
              key={file.name}
              onClick={() => {
                setActiveFileIdx(idx);
                setShowOutput(false);
              }}
              className={`flex items-center gap-2 px-4 py-2 text-left transition-colors cursor-pointer w-full shrink-0 md:shrink ${
                activeFileIdx === idx
                  ? 'bg-zinc-900 text-violet-400 border-b-2 md:border-b-0 md:border-l-2 border-violet-500'
                  : 'text-zinc-500 hover:bg-zinc-900/40 hover:text-zinc-300'
              }`}
            >
              <FiCode className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{file.name}</span>
            </button>
          ))}
        </div>

        {/* Code display area */}
        <div className="flex-1 bg-[#050212]/80 p-4 overflow-y-auto relative scrollbar-thin">
          <pre className="text-[11px] leading-relaxed text-zinc-300 whitespace-pre-wrap font-mono">
            <code>
              {activeFile.code.split('\n').map((line, i) => {
                // Extremely basic syntax coloring via string regex matching (clean enough for mock editor)
                let styledLine = line
                  .replace(/(const|let|var|import|from|return|query|await|export|default)/g, '<span class="text-pink-500 font-semibold">$1</span>')
                  .replace(/(async|function|class)/g, '<span class="text-emerald-400 font-semibold">$1</span>')
                  .replace(/('.*?'|".*?")/g, '<span class="text-yellow-200/90">$1</span>')
                  .replace(/(\/\/.+)/g, '<span class="text-zinc-500 font-normal">$1</span>')
                  .replace(/(console\.log|mongoose\.connect|app\.use|express)/g, '<span class="text-blue-400">$1</span>');

                return (
                  <div key={i} className="flex hover:bg-zinc-900/20 px-2 rounded">
                    <span className="w-6 text-zinc-600 text-right pr-3 select-none">{i + 1}</span>
                    <span dangerouslySetInnerHTML={{ __html: styledLine || ' ' }} />
                  </div>
                );
              })}
            </code>
          </pre>
        </div>
      </div>

      {/* Terminal Output Section */}
      <div className="border-t border-zinc-900 bg-zinc-950/90 flex flex-col max-h-[140px]">
        <div className="px-4 py-2 border-b border-zinc-900/60 flex items-center justify-between text-zinc-500">
          <span className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider">
            <FiTerminal className="w-3.5 h-3.5" /> Live Build Output
          </span>
          {showOutput && (
            <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-semibold">
              <FiCheck className="w-3.5 h-3.5" /> COMPILED SUCCESS
            </span>
          )}
        </div>
        <div className="p-3 overflow-y-auto flex-1 font-mono text-[11px] text-zinc-400 leading-normal scrollbar-thin">
          {isRunning ? (
            <div className="flex items-center gap-2 text-violet-400 animate-pulse">
              <FiRefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Building workspace bundle, mapping Hasura schemas, testing REST routers...</span>
            </div>
          ) : showOutput ? (
            <pre className="text-zinc-300 leading-relaxed font-mono whitespace-pre-wrap">{activeFile.output}</pre>
          ) : (
            <div className="text-zinc-600">
              Terminal idle. Click "Run Code" at the top right to execute the current file context.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
