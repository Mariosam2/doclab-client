import './Summary.css';
import { useGetDocuments, useGenerateSummary } from '@src/shared/hooks/useDocument';
import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sparkle from '@src/shared/ui/Icons/Sparkle';
import DocumentText from '@src/shared/ui/Icons/DocumentText';
import { showToast } from '@src/shared/helpers';
import { ToastType } from '@src/shared/enums/ToastType.enum';
import type { IDocument } from '@src/shared/interfaces/document/IDocument';

type Tab = 'mine' | 'shared';

const Summary = () => {
  const { data, isLoading: docsLoading } = useGetDocuments();
  const { mutateAsync: generateSummary, isPending: isGenerating } = useGenerateSummary();

  const [tab, setTab] = useState<Tab>('mine');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [summary, setSummary] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const docs = useMemo(() => {
    const list = tab === 'mine' ? data?.data.userDocuments : data?.data.editorDocuments;
    if (!list) return [];
    const q = search.trim().toLowerCase();
    if (!q) return list;
    return list.filter((d) => (d.title || 'Untitled').toLowerCase().includes(q));
  }, [data, tab, search]);

  const selected: IDocument | null = useMemo(() => {
    if (!selectedId || !data) return null;
    return (
      data.data.userDocuments.find((d) => d.documentId === selectedId) ||
      data.data.editorDocuments.find((d) => d.documentId === selectedId) ||
      null
    );
  }, [selectedId, data]);

  const handleGenerate = async () => {
    if (!selectedId) return;
    setSummary(null);
    try {
      const res = await generateSummary({ documentId: selectedId });
      setSummary(res.data ?? '');
      showToast('Summary ready', 'Your document summary has been generated', ToastType.SUCCESS);
    } catch {
      showToast('Error', 'Could not generate summary', ToastType.DANGER);
    }
  };

  const copySummary = async () => {
    if (!summary) return;
    await navigator.clipboard.writeText(summary);
    showToast('Copied', 'Summary copied to clipboard', ToastType.SUCCESS);
  };

  return (
    <section className="summary w-full relative flex flex-col flex-1 overflow-hidden">
      {/* Ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            'radial-gradient(60rem 40rem at 85% -10%, rgba(153, 102, 255, 0.12), transparent 60%), radial-gradient(50rem 35rem at -10% 110%, rgba(204, 204, 255, 0.18), transparent 55%)',
        }}
      />

      <div className="relative flex flex-col flex-1 px-12 py-10 min-h-0">
        {/* Header */}
        <header className="flex items-start justify-between gap-6 mb-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-c-periwinkle/30 text-c-electric-violet text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkle className="size-3.5" />
              AI Summary
            </div>
            <h1 className="text-4xl font-bold text-gray-900 leading-tight">
              Distill any document <br />
              <span className="font-lora italic font-normal text-c-medium-purple">into its essence.</span>
            </h1>
            <p className="text-gray-500 mt-3 text-[15px]">
              Pick a document from your library or one shared with you. We'll condense it into a focused summary.
            </p>
          </div>
        </header>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 flex-1 min-h-0">
          {/* LEFT: picker */}
          <div className="lg:col-span-2 flex flex-col bg-white/70 backdrop-blur rounded-2xl border border-gray-200/80 shadow-sm min-h-0">
            <div className="p-4 border-b border-gray-100 shrink-0">
              <div className="flex items-center gap-2 mb-3">
                <button
                  onClick={() => setTab('mine')}
                  className={`flex-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    tab === 'mine'
                      ? 'bg-c-medium-purple text-white shadow-sm'
                      : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  My documents
                </button>
                <button
                  onClick={() => setTab('shared')}
                  className={`flex-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    tab === 'shared'
                      ? 'bg-c-medium-purple text-white shadow-sm'
                      : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  Shared with me
                </button>
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by title..."
                  className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-200 bg-white focus:outline-none focus:border-c-medium-purple focus:ring-2 focus:ring-c-medium-purple/20 text-sm"
                />
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-2 min-h-0">
              {docsLoading ? (
                <div className="space-y-2 p-2">
                  {[0, 1, 2, 3].map((i) => (
                    <div key={i} className="h-16 rounded-lg bg-gray-100 animate-pulse" />
                  ))}
                </div>
              ) : docs.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12 px-4">
                  <div className="size-14 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                    <DocumentText className="size-7 text-gray-300" />
                  </div>
                  <p className="text-sm font-medium text-gray-500">
                    {search ? 'No matches found' : tab === 'mine' ? 'No documents yet' : 'Nothing shared with you yet'}
                  </p>
                  {search && <p className="text-xs text-gray-400 mt-1">Try a different search term</p>}
                </div>
              ) : (
                <motion.ul
                  className="space-y-1"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { staggerChildren: 0.03 } },
                  }}
                >
                  {docs.map((doc) => {
                    const isSelected = doc.documentId === selectedId;
                    return (
                      <motion.li
                        key={doc.documentId}
                        variants={{
                          hidden: { opacity: 0, y: 6 },
                          visible: { opacity: 1, y: 0 },
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => setSelectedId(doc.documentId)}
                          className={`w-full text-left flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer ${
                            isSelected
                              ? 'border-c-medium-purple bg-c-periwinkle/20 shadow-sm'
                              : 'border-transparent hover:border-gray-200 hover:bg-gray-50'
                          }`}
                          aria-pressed={isSelected}
                        >
                          <div
                            className={`size-9 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                              isSelected ? 'bg-c-medium-purple text-white' : 'bg-gray-100 text-gray-400'
                            }`}
                          >
                            <DocumentText className="size-4.5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-800 truncate">{doc.title || 'Untitled'}</p>
                            <p className="text-xs text-gray-400 mt-0.5">
                              {doc.updatedAt
                                ? new Date(doc.updatedAt).toLocaleDateString('it-IT', {
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric',
                                  })
                                : 'No updates yet'}
                            </p>
                          </div>
                          <div
                            className={`size-4 rounded-full border-2 shrink-0 transition-all ${
                              isSelected ? 'border-c-medium-purple bg-c-medium-purple' : 'border-gray-300'
                            }`}
                          >
                            {isSelected && (
                              <motion.svg
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="size-full text-white"
                                viewBox="0 0 16 16"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 8l3 3 5-6" />
                              </motion.svg>
                            )}
                          </div>
                        </button>
                      </motion.li>
                    );
                  })}
                </motion.ul>
              )}
            </div>
          </div>

          {/* RIGHT: summary canvas */}
          <div className="lg:col-span-3 flex flex-col bg-white rounded-2xl border border-gray-200/80 shadow-sm min-h-0 overflow-hidden">
            <AnimatePresence mode="wait">
              {isGenerating ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center flex-1 text-center px-8"
                >
                  <div className="relative size-20 mb-6">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="absolute inset-0 flex items-center justify-center"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.3, 1, 0.3],
                          rotate: [0, 20, 0],
                        }}
                        transition={{
                          duration: 2.2,
                          repeat: Infinity,
                          delay: i * 0.35,
                          ease: 'easeInOut',
                        }}
                      >
                        <Sparkle className="size-10 text-c-medium-purple" />
                      </motion.div>
                    ))}
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-1">Crafting your summary</h2>
                  <p className="text-gray-500 text-sm max-w-sm">
                    Reading <span className="font-medium text-gray-700">"{selected?.title || 'Untitled'}"</span> and
                    pulling out the key ideas...
                  </p>
                </motion.div>
              ) : summary !== null ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col flex-1 min-h-0"
                >
                  <div className="flex items-center justify-between gap-3 px-6 py-4 border-b border-gray-100 shrink-0">
                    <div className="min-w-0">
                      <p className="text-xs uppercase tracking-wider text-c-medium-purple font-semibold">Summary of</p>
                      <h2 className="text-base font-semibold text-gray-900 truncate">
                        {selected?.title || 'Untitled'}
                      </h2>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={copySummary}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
                      >
                        <svg
                          className="size-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.5 8.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v8.25A2.25 2.25 0 006 16.5h2.25m8.25-8.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-7.5A2.25 2.25 0 018.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 00-2.25 2.25v6"
                          />
                        </svg>
                        Copy
                      </button>
                      <button
                        type="button"
                        onClick={handleGenerate}
                        disabled={!selectedId}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-c-electric-violet text-sky-50 hover:bg-c-medium-purple transition-colors cursor-pointer disabled:opacity-50"
                      >
                        <Sparkle className="size-3.5" />
                        Regenerate
                      </button>
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-auto px-8 py-6">
                    {summary.trim() === '' ? (
                      <p className="text-sm text-gray-400 italic">The summary came back empty.</p>
                    ) : (
                      <article className="font-lora text-[16px] leading-[1.75] text-gray-800 whitespace-pre-wrap">
                        {summary}
                      </article>
                    )}
                  </div>
                </motion.div>
              ) : selected ? (
                <motion.div
                  key="ready"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center flex-1 text-center px-8"
                >
                  <div className="size-16 rounded-2xl bg-c-periwinkle/30 flex items-center justify-center mb-5">
                    <DocumentText className="size-8 text-c-electric-violet" />
                  </div>
                  <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-1">
                    Ready to summarize
                  </p>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2 max-w-md">{selected.title || 'Untitled'}</h2>
                  <p className="text-gray-500 text-sm max-w-sm mb-8">
                    We'll read through your document and extract the key points in a single summary.
                  </p>
                  <button
                    type="button"
                    onClick={handleGenerate}
                    className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-c-electric-violet text-sky-50 font-semibold text-sm shadow-lg shadow-c-electric-violet/25 hover:bg-c-medium-purple hover:shadow-xl hover:shadow-c-medium-purple/30 transition-all cursor-pointer"
                  >
                    <Sparkle className="size-4 group-hover:rotate-12 transition-transform" />
                    Generate summary
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center flex-1 text-center px-8"
                >
                  <div className="relative size-20 mb-5">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-c-periwinkle/30 to-c-medium-purple/10 blur-xl" />
                    <div className="relative size-full rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center">
                      <Sparkle className="size-9 text-c-medium-purple" />
                    </div>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-1">Pick a document to start</h2>
                  <p className="text-gray-500 text-sm max-w-xs">
                    Select one of your documents on the left and we'll generate a concise summary in seconds.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Summary;
