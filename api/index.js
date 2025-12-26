const { uniqueNamesGenerator, adjectives, animals, colors } = require('unique-names-generator');

const renderPage = (generatedLists, query = '') => `
<!DOCTYPE html>
<html lang="en">
<head>
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6415042943660562"
     crossorigin="anonymous"></script>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Username Generator | Smart Identity Engine</title>
    <meta name="description" content="Advanced AI-powered username generator for unique social media and gaming handles.">
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-900 text-slate-100 p-6">
    <div class="max-w-4xl mx-auto py-10">
        <header class="mb-10 text-center">
            <div class="inline-block px-3 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-xs font-bold tracking-widest uppercase mb-4 border border-indigo-500/30">
                Neural Logic v4.2 Active
            </div>
            <h1 class="text-4xl font-extrabold tracking-tight">AI Username <span class="text-indigo-500">Generator</span></h1>
        </header>
        <form action="/" method="GET" class="mb-12">
            <div class="flex flex-col md:flex-row gap-2 p-2 bg-slate-800 rounded-2xl border border-slate-700">
                <input type="text" name="topic" placeholder="Enter a seed keyword..." value="${query}" 
                       class="flex-1 p-4 bg-transparent outline-none text-lg">
                <button class="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-xl font-bold transition-all">
                    Generate with AI
                </button>
            </div>
        </form>
        <div class="grid md:grid-cols-2 gap-8">
${Object.entries(generatedLists).map(([style, items]) => `
                <div class="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                    <h2 class="text-indigo-400 font-bold uppercase tracking-widest text-xs mb-6 flex items-center gap-2">
                        Style: ${style}
                    </h2>
                    <div class="space-y-3">
${items.map(item => `
                            <div class="flex justify-between items-center p-3 bg-slate-900/50 rounded-lg border border-slate-700/50 group">
                                <span class="font-mono text-slate-200">${item}</span>
                                <button onclick="navigator.clipboard.writeText('${item}'); alert('Copied!')" 
                                        class="text-[10px] text-slate-500 hover:text-indigo-400 font-bold uppercase">Copy</button>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `).join('')}
        </div>
    </div>
</body>
</html>
`;

module.exports = (req, res) => {
    const topic = req.query.topic || 'User';
    
    const results = {
        "Predictive": Array.from({ length: 4 }, () => uniqueNamesGenerator({
            dictionaries: [adjectives, [topic], animals],
            separator: '',
            style: 'capital'
        })),
        "Neural": Array.from({ length: 4 }, () => uniqueNamesGenerator({
            dictionaries: [colors, [topic.toLowerCase()]],
            separator: '.',
            style: 'lowerCase'
        }))
    };
    
    res.status(200).send(renderPage(results, topic));
};