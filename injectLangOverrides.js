const fs = require('fs');
const path = require('path');

// 1. Fix /learn/page.tsx
const learnPagePath = 'src/app/learn/page.tsx';
if (fs.existsSync(learnPagePath)) {
  let c = fs.readFileSync(learnPagePath, 'utf8');
  if (!c.includes('LanguageSelector')) {
    c = c.replace("import { BookOpen,", "import { ChevronRight, BookOpen,");
    c = c.replace(/export default function LearnHub\(\) \{/, 
      "export default function LearnHub() {\n  const { t } = useTranslation();");
    c = c.replace("import { useTranslation } from 'react-i18next';", 
      "import { useTranslation } from 'react-i18next';\nimport { LanguageSelector } from '@/components/LanguageSelector';");
    c = c.replace(`<h1 className="heading-md">Academy</h1>`, 
      `<h1 className="heading-md" style={{ flex: 1 }}>{t('Academy')}</h1>\n         <LanguageSelector />`);
    fs.writeFileSync(learnPagePath, c);
  }
}

// 2. Fix /explore/page.tsx
const explorePagePath = 'src/app/explore/page.tsx';
if (fs.existsSync(explorePagePath)) {
  let c = fs.readFileSync(explorePagePath, 'utf8');
  if (!c.includes('LanguageSelector')) {
    c = c.replace("import { useTranslation } from 'react-i18next';", 
      "import { useTranslation } from 'react-i18next';\nimport { LanguageSelector } from '@/components/LanguageSelector';");
    c = c.replace(`<div style={{ maxWidth: 680, margin: '0 auto' }}>`, 
      `<div style={{ maxWidth: 680, margin: '0 auto', display: 'flex', alignItems: 'center' }}>\n          <div>`);
    c = c.replace(`<h1 className="heading-xl" style={{ color: 'var(--text-primary)' }}>Explore</h1>\n        </div>`,
       `<h1 className="heading-xl" style={{ color: 'var(--text-primary)' }}>{t('Explore')}</h1>\n          </div>\n          <div style={{ flex: 1 }} />\n          <LanguageSelector />\n        </div>`);
    // make sure to translate "Content Library"
    c = c.replace(`>Content Library</p>`, `>{t('Content Library')}</p>`);
    fs.writeFileSync(explorePagePath, c);
  }
}

// 3. Fix explore subpages topbars to include LanguageSelector
const exploreSubdirs = ['financial-myths', 'financial-faqs', 'financial-articles', 'financial-tips', 'financial-stories'];
exploreSubdirs.forEach(d => {
  const p = `src/app/explore/${d}/page.tsx`;
  if (fs.existsSync(p)) {
    let c = fs.readFileSync(p, 'utf8');
    if (!c.includes('LanguageSelector')) {
      c = c.replace("from 'lucide-react';", "from 'lucide-react';\nimport { LanguageSelector } from '@/components/LanguageSelector';\nimport { useTranslation } from 'react-i18next';");
      // add const { t } = useTranslation();
      c = c.replace(/export default function \w+\(\) \{/, (match) => `${match}\n  const { t } = useTranslation();`);
      
      // Inject LanguageSelector into topbar
      c = c.replace(/<div><h1 className="heading-md">([^<]+)<\/h1><\/div>\s*<\/div>/, (match, title) => {
        return `<div style={{ flex: 1 }}><h1 className="heading-md">{t('${title}')}</h1></div>\n        <LanguageSelector />\n      </div>`;
      });
      fs.writeFileSync(p, c);
    }
  }
});

// 4. Fix LearnModule.tsx
const learnModulePath = 'src/components/LearnModule.tsx';
if (fs.existsSync(learnModulePath)) {
  let c = fs.readFileSync(learnModulePath, 'utf8');
  if (!c.includes('PageHeader')) {
    c = c.replace("import { Clock, BookOpen, CheckCircle2 } from 'lucide-react';",
      "import { Clock, BookOpen, CheckCircle2 } from 'lucide-react';\nimport { PageHeader } from './layout/PageHeader';");
    c = c.replace(/<div style={{ minHeight: '100vh', background: 'var\(--bg-base\)', padding: 'var\(--space-8\) var\(--space-4\) var\(--space-20\)' }}>/,
      `<div style={{ minHeight: '100vh', background: 'var(--bg-base)' }}>\n      <PageHeader title={t(title)} backHref="/learn" />\n      <div style={{ padding: 'var(--space-8) var(--space-4) var(--space-20)' }}>`);
    fs.writeFileSync(learnModulePath, c);
  }
}

// 5. Fix Quiz questions lack of translation
const checkIns = ['investment-readiness', 'money-stress-quiz', 'savings-check-up', 'spending-style-quiz'];
checkIns.forEach(d => {
  const p = `src/app/check-ins/${d}/page.tsx`;
  if (fs.existsSync(p)) {
    let c = fs.readFileSync(p, 'utf8');
    // {QUESTIONS[step-1].text}
    c = c.replace(/\{QUESTIONS\[step-1\]\.text\}/g, "{t(QUESTIONS[step-1].text)}");
    // {someVar.label} or {someVar.desc} in the result cards
    // readiness.label, styleResult.label, assessment.label, savingsHealth.label
    c = c.replace(/\{readiness\.label\}/g, "{t(readiness.label)}");
    c = c.replace(/\{readiness\.desc\}/g, "{t(readiness.desc)}");
    c = c.replace(/\{styleResult\.label\}/g, "{t(styleResult.label)}");
    c = c.replace(/\{styleResult\.desc\}/g, "{t(styleResult.desc)}");
    c = c.replace(/\{assessment\.label\}/g, "{t(assessment.label)}");
    c = c.replace(/\{assessment\.desc\}/g, "{t(assessment.desc)}");
    c = c.replace(/\{savingsHealth\.label\}/g, "{t(savingsHealth.label)}");
    c = c.replace(/\{savingsHealth\.desc\}/g, "{t(savingsHealth.desc)}");
    fs.writeFileSync(p, c);
  }
});

console.log("Fixes applied successfully.");
