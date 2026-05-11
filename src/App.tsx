/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Target, 
  Search, 
  Share2, 
  ClipboardCheck, 
  ArrowLeft,
  Users,
  BarChart3,
  Lightbulb,
  FileText,
  Activity,
  Flag,
  Hammer,
  Clock,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  Goal,
  Puzzle,
  ChevronLeft,
  ChevronRight,
  Gavel
} from 'lucide-react';

// --- Types ---
type StageKey = number;

interface StageData {
  id: number;
  label: string;
  title: string;
  question: string;
  essence: string;
  icon: React.ReactNode;
  description: string;
  goal: string;
  points: string[];
  howApplied: string[];
  outputs: string[];
  kpis: string[];
  tools: string[];
  duration: string;
  startWeek: string;
  decisionGate: string;
  color: string;
}

// --- Content Data mapped from PDF ---
const STAGES: StageData[] = [
  {
    id: 0,
    label: 'تمركز',
    title: 'مرحلة الغاية والمعنيين',
    question: 'لماذا وجدنا، ولمن؟',
    essence: 'تحديد الغاية والمعنيين',
    icon: <Target className="w-12 h-12" />,
    description: 'تحليل الغاية المؤسسية وفهم الدور التنموي للجمعية في سياقها المحلي والوطني.',
    goal: 'هي مرحلة تأسيسية تفسيرية تراجع فيها الجمعية إطارها الاستراتيجي الحاكم، وتعيد قراءة غايتها الأصيلة ودورها التنموي، وتحدد المعنيين الرئيسيين والفئات ذات الأولوية، وتستخلص القضايا التنموية الجوهرية وفرضيات الأثر العليا التي ستوجه بقية مراحل المشروع.',
    points: [
      'مراجعة وثيقة الإطار الاستراتيجي',
      'تحليل الغاية الأصيلة للجمعية',
      'تحليل المعنيين الرئيسيين',
      'تحديد الفئات ذات الأولوية',
      'تحليل الاحتياجات والتوقعات',
      'تحليل القضايا التنموية الجوهرية',
      'تحديد فرضيات الأثر العليا'
    ],
    howApplied: [
      'مراجعة الإطار الاستراتيجي وعقد جلسات مركزة لفهم الغاية الأصيلة للجمعية.',
      'تحليل المعنيين الرئيسيين وتحديد الفئات ذات الأولوية وفق الرسالة والاحتياج.',
      'استخلاص القضايا التنموية الجوهرية وصياغة فرضيات الأثر العليا لتوجيه المراحل اللاحقة.'
    ],
    outputs: [
      'صياغة الغاية الأصيلة للجمعية',
      'خارطة المعنيين الرئيسيين وتصنيفهم',
      'الفئات ذات الأولوية المعتمدة',
      'مصفوفة علاقة المعنيين بالغاية',
      'مصفوفة عروض القيمة للمعنيين',
      'القضايا التنموية الجوهرية المعتمدة',
      'مصفوفة ترجيح الفئات والقضايا',
      'فرضيات الأثر العليا'
    ],
    kpis: [
      'اكتمال صياغة الغاية الأصيلة',
      'اكتمال خريطة المعنيين الرئيسيين',
      'اكتمال تحديد الفئات ذات الأولوية',
      'اكتمال مصفوفة علاقة المعنيين',
      'اكتمال مصفوفة عروض القيمة',
      'اكتمال تحديد القضايا التنموية',
      'اكتمال صياغة فرضيات الأثر'
    ],
    tools: [
      'وثيقة الإطار الاستراتيجي',
      'نموذج صياغة الغاية الأصيلة',
      'مصفوفة تحليل المعنيين الرئيسيين',
      'نموذج تحديد الفئات ذات الأولوية',
      'مصفوفة عروض القيمة للمعنيين',
      'نموذج ترجيح القضايا التنموية',
      'أداة صياغة فرضيات الأثر'
    ],
    duration: 'أسبوعان',
    startWeek: 'الأسبوع 19',
    decisionGate: 'اعتماد الغاية الأصيلة، والمعنيين الرئيسيين، والفئات ذات الأولوية، والقضايا التنموية الجوهرية، وفرضيات الأثر العليا.',
    color: '#01a79d' 
  },
  {
    id: 1,
    label: 'رصد',
    title: 'مرحلة التحليل الاستراتيجي',
    question: 'أين نحن الآن؟',
    essence: 'التحليل الاستراتيجي',
    icon: <Search className="w-12 h-12" />,
    description: 'تحليل البيئة الداخلية والخارجية لاستكشاف الفرص ومواجهة التحديات.',
    goal: 'فهم الواقع المؤسسي للجمعية فهمًا شاملًا من خلال تحليل البيئة الداخلية والخارجية، وربط نتائجها لاستخلاص نقاط القوة والضعف، والفرص والتهديدات، والميزة التنافسية وعوامل النجاح الحاسمة والقضايا الاستراتيجية.',
    points: [
      'تحليل البيئة الداخلية',
      'تحليل البيئة الخارجية',
      'تحليل ربط البيئة الخارجية في البيئة الداخلية',
      'تحليل وفق استراتيجيات SWOT',
      'تحليل المخاطر الاستراتيجية',
      'تحليل القضايا والتحديات الاستراتيجية'
    ],
    howApplied: [
      'تعبئة أدوات التحليل وجمع البيانات من الجهات المعنية.',
      'عقد لقاءات وورش عمل مركزة.',
      'تحليل النتائج وتصنيفها بحسب المحاور الاستراتيجية.',
      'بناء تقرير التحليل الاستراتيجي ومصفوفة ربط العوامل.'
    ],
    outputs: [
      'تقرير التحليل الاستراتيجي',
      'مصفوفة تحليل العوامل الداخلية والخارجية',
      'مصفوفة ربط العوامل وتحليل SWOT',
      'الميزة التنافسية للجمعية',
      'عوامل النجاح الحاسمة',
      'القضايا الاستراتيجية الرئيسة'
    ],
    kpis: [
      'اكتمال تحليل البيئة الداخلية والخارجية',
      'اكتمال مصفوفة ربط العوامل وتحليل SWOT',
      'اكتمال تقرير التحليل الاستراتيجي',
      'اكتمال تحديد القضايا الاستراتيجية',
      'اكتمال تحديد عوامل النجاح والميزة'
    ],
    tools: [
      'أداة PESTEL (البيئة الخارجية)',
      'مقياس قيادة الصناعة',
      'المقارنة المرجعية',
      'مصفوفة قياس العمل المؤسسي',
      'أداة SWOT الاستراتيجية',
      'مصفوفة ربط العوامل'
    ],
    duration: '4 أسابيع',
    startWeek: 'الأسبوع 20',
    decisionGate: 'اعتماد تقرير التحليل الاستراتيجي، ومصفوفة ربط العوامل، والقضايا الاستراتيجية الرئيسة، وعوامل النجاح، والميزة التنافسية.',
    color: '#8cc342' 
  },
  {
    id: 2,
    label: 'أثر',
    title: 'مرحلة بناء الخطة الاستراتيجية',
    question: 'ماذا نريد أن نفعل؟',
    essence: 'بناء الخطة الاستراتيجية',
    icon: <Goal className="w-12 h-12" />,
    description: 'صياغة التوجه الاستراتيجي وتحديد الأثر التنموي المستهدف.',
    goal: 'بناء التوجه والخطة الاستراتيجية للجمعية في ضوء الغاية الأصيلة ومخرجات التحليل الاستراتيجي، من خلال تحديد الأثر المستهدف، وترجيح الخيارات والأولويات، وتحديد المرتكزات، وصياغة الرؤية والرسالة والقيم ونظرية التغيير.',
    points: [
      'تحديد الأثر الاستراتيجي المستهدف',
      'تحليل الأثر المراد إحداثه',
      'ترجيح الخيارات والأولويات الاستراتيجية',
      'الهوية الاستراتيجية (رؤية، رسالة، قيم)',
      'نظرية التغيير',
      'الأهداف الاستراتيجية ومؤشراتها',
      'الخريطة الاستراتيجية'
    ],
    howApplied: [
      'مراجعة مخرجات الغاية والمعنيين والتحليل الاستراتيجي.',
      'تحديد الأثر الاستراتيجي المستهدف.',
      'صياغة الرؤية والرسالة والقيم الجديدة.',
      'بناء نظرية التغيير لضمان تحقيق الأثر.'
    ],
    outputs: [
      'الأثر الاستراتيجي المستهدف',
      'الخيارات والأولويات الاستراتيجية',
      'المرتكزات والركائز الاستراتيجية',
      'الرؤية والرسالة والقيم',
      'نموذج نظرية التغيير',
      'الأهداف الاستراتيجية ومؤشراتها',
      'الخريطة الاستراتيجية المتكاملة'
    ],
    kpis: [
      'اكتمال تحديد الأثر المستهدف',
      'اكتمال اعتماد الخيارات والأولويات',
      'اكتمال تحديد المرتكزات والركائز',
      'اكتمال صياغة الرؤية والرسالة والقيم',
      'اكتمال بناء نظرية التغيير',
      'اكتمال بناء الخريطة الاستراتيجية'
    ],
    tools: [
      'أداة تحديد الأثر المستهدف',
      'أداة ترجيح الخيارات والأولويات',
      'نموذج بناء الرؤية والرسالة',
      'أداة بناء نظرية التغيير',
      'أداة بناء الأهداف الاستراتيجية',
      'نموذج الخريطة الاستراتيجية'
    ],
    duration: '5 أسابيع',
    startWeek: 'الأسبوع 26',
    decisionGate: 'اعتماد الأثر الاستراتيجي، والمرتكزات والركائز، والرؤية والرسالة والقيم، ونظرية التغيير، والأهداف، والخريطة الاستراتيجية.',
    color: '#0068b3' 
  },
  {
    id: 3,
    label: 'وصل',
    title: 'مرحلة الترجمة إلى التنفيذ',
    question: 'من يفعل ذلك؟',
    essence: 'ترجمة الاستراتيجية إلى التنفيذ',
    icon: <Puzzle className="w-12 h-12" />,
    description: 'تحويل الأهداف إلى مبادرات وخطط تكتيكية قابلة للتنفيذ.',
    goal: 'ترجمة الخطة الاستراتيجية المعتمدة إلى منظومة تنفيذ واضحة، من خلال تصميم المبادرات، واستكمال البناء الفني للمؤشرات، ومواءمة الهيكل والعمليات والأدوار، وإعداد الخطة التنفيذية وإدارة المخاطر.',
    points: [
      'مراجعة نموذج العمل',
      'مواءمة الهيكل التنظيمي',
      'مواءمة العمليات وإجراءات العمل',
      'دليل الأهداف والمؤشرات',
      'الخطة التنفيذية والتشغيلية',
      'الأهداف الوظيفية',
      'المواءمة الاستراتيجية للأداءات',
      'خطة إدارة المخاطر'
    ],
    howApplied: [
      'تصميم المبادرات الاستراتيجية بما يترجم الأهداف.',
      'ترتيب المبادرات بحسب الأولوية والجاهزية.',
      'استكمال البناء الفني لمؤشرات الأهداف.',
      'مواءمة الهيكل والعمليات لمتطلبات التنفيذ.'
    ],
    outputs: [
      'بطاقات المبادرات الاستراتيجية',
      'التوصيف الفني لمؤشرات الأهداف',
      'مواءمة الهيكل والعمليات مع الاستراتيجية',
      'الخطة التنفيذية والتشغيلية',
      'الأهداف الوظيفية',
      'مصفوفة الربط بين مستويات الخطة',
      'خطة إدارة المخاطر الاستراتيجية'
    ],
    kpis: [
      'اكتمال تصميم المبادرات',
      'اكتمال التوصيف الفني للمؤشرات',
      'اكتمال مواءمة الهيكل والعمليات',
      'اكتمال إعداد الخطة التنفيذية والتشغيلية',
      'اكتمال صياغة الأهداف الوظيفية',
      'اكتمال إعداد مصفوفة الربط'
    ],
    tools: [
      'بطاقات تصميم المبادرات',
      'بطاقة توصيف المؤشر الاستراتيجي',
      'نموذج مواءمة الهيكل التنظيمي',
      'نموذج الخطة التنفيذية',
      'نموذج صياغة الأهداف الوظيفية',
      'سجل المخاطر الاستراتيجية'
    ],
    duration: '4 أسابيع',
    startWeek: 'الأسبوع 30',
    decisionGate: 'اعتماد المبادرات، والتوصيف الفني للمؤشرات، والخطة التنفيذية والتشغيلية، والأهداف الوظيفية، ومصفوفة الربط، وخطة المواءمة وسجل المخاطر.',
    color: '#1d204a' 
  },
  {
    id: 4,
    label: 'فحص',
    title: 'مرحلة حوكمة الخطة الاستراتيجية',
    question: 'كيف نتأكد من فعل ذلك؟',
    essence: 'حوكمة الخطة الاستراتيجية',
    icon: <ShieldCheck className="w-12 h-12" />,
    description: 'بناء نظام لمراقبة الأداء وضمان تحقيق النتائج المنشودة.',
    goal: 'بناء إطار حوكمة ومتابعة للخطة الاستراتيجية يحدد آليات قياس الأداء، والمراجعة الدورية، والتصعيد، وسد فجوات الجاهزية، وإعداد التقارير، بما يضمن تنفيذًا منضبطًا ومتابعة مستمرة واتخاذ قرار مبني على الأداء.',
    points: [
      'تحليل فجوة الجاهزية المؤسسية',
      'منهجية متابعة الأداء الاستراتيجي',
      'التقارير الدورية (نماذج وآليات)',
      'آليات التصعيد واتخاذ القرار',
      'مراجعة الانحرافات والإجراءات التصحيحية',
      'لوحة القيادة الاستراتيجية',
      'استثمار الأدوات المؤسسية الداعمة'
    ],
    howApplied: [
      'تحليل فجوات الجاهزية المؤسسية والتنفيذية.',
      'بناء منهجية متابعة الأداء الاستراتيجي.',
      'تحديد آلية التصعيد واتخاذ القرار عند الانحرافات.',
      'إعداد نماذج التقارير ولوحة القيادة.'
    ],
    outputs: [
      'إطار حوكمة ومتابعة الاستراتيجية',
      'تقرير تحليل فجوة الجاهزية',
      'خطة سد فجوة الجاهزية',
      'منهجية متابعة الأداء',
      'آلية التصعيد واتخاذ القرار',
      'لوحة القيادة الاستراتيجية'
    ],
    kpis: [
      'اكتمال بناء إطار الحوكمة والمتابعة',
      'اكتمال تحليل فجوة الجاهزية',
      'اكتمال إعداد خطة سد الفجوات',
      'اكتمال إعداد منهجية متابعة الأداء',
      'اكتمال تصميم آلية التصعيد',
      'اكتمال بناء لوحة القيادة'
    ],
    tools: [
      'نموذج تحليل فجوة الجاهزية',
      'منهجية متابعة الأداء الاستراتيجي',
      'نماذج التقارير الدورية',
      'مصفوفة التصعيد واتخاذ القرار',
      'لوحة القيادة (Dashboard)',
      'أنظمة الأداء المؤسسي'
    ],
    duration: '8 أسابيع',
    startWeek: 'الأسبوع 42',
    decisionGate: 'تفعيل إطار حوكمة ومتابعة الاستراتيجية، واعتماد خطة سد فجوات الجاهزية ومنهجية المتابعة ولوحة القيادة.',
    color: '#f39200' 
  }
];

// --- Components ---

const TraofLogo = ({ className = "w-16 h-16" }: { className?: string }) => (
  <div className={`relative flex items-center justify-center ${className}`}>
    <div className="absolute inset-0 bg-[#01a79d] rounded-full opacity-10 blur-xl" />
    <svg viewBox="0 0 100 100" className="w-full h-full relative z-10">
      <circle cx="50" cy="50" r="12" fill="#01a79d" />
      <circle cx="35" cy="40" r="10" fill="#8cc342" />
      <circle cx="65" cy="40" r="10" fill="#8cc342" />
      <path d="M 30 70 Q 50 85 70 70" stroke="#606161" strokeWidth="6" fill="none" strokeLinecap="round" />
    </svg>
  </div>
);

const HubCircle = ({ onStageSelect, activeStage }: { onStageSelect: (s: StageKey) => void, activeStage: StageKey | null }) => {
  return (
    <div className="relative w-full max-w-[650px] aspect-square flex items-center justify-center">
      {/* Central Identity Sphere */}
      <motion.div 
        animate={{ 
          scale: activeStage !== null ? 0.8 : 1,
          opacity: activeStage !== null ? 0.4 : 1 
        }}
        className="relative z-50 w-[200px] h-[200px] rounded-full bg-white flex flex-col items-center justify-center text-center shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-50 overflow-hidden"
      >
         <TraofLogo className="w-20 h-20 mb-2" />
         <div className="px-4">
            <h2 className="text-3xl font-black text-slate-800 tracking-tighter">تراؤف</h2>
            <p className="text-xs font-bold text-slate-400 tracking-[0.2em] mt-1">TRAOF</p>
         </div>
         <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-brand-teal/5 rounded-full blur-2xl" />
      </motion.div>

      {/* Overlapping Circles (Petals) */}
      <div className="absolute inset-0 z-20">
        {STAGES.map((stage, i) => {
          const angles = [-90, -18, 54, 126, 198];
          const dist = 180;
          const angleRad = (angles[i] * Math.PI) / 180;
          const x = Math.cos(angleRad) * dist;
          const y = Math.sin(angleRad) * dist;

          const isActive = activeStage === stage.id;
          const isDimmed = activeStage !== null && !isActive;

          const labelRadius = 315; 
          const labelX = Math.cos(angleRad) * labelRadius;
          const labelY = Math.sin(angleRad) * labelRadius;

          return (
            <React.Fragment key={stage.id}>
              <motion.div
                initial={false}
                animate={{ 
                  x, y,
                  scale: isActive ? 1.25 : (isDimmed ? 0.85 : 1),
                  opacity: isDimmed ? 0.15 : 1,
                  zIndex: isActive ? 100 : 40
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer group"
                onClick={() => onStageSelect(stage.id)}
              >
                <div 
                  className="w-48 h-48 rounded-full flex flex-col items-center justify-center text-white shadow-2xl relative overflow-hidden transition-all duration-500 group-hover:scale-105"
                  style={{ 
                    backgroundColor: stage.color,
                    boxShadow: `0 20px 40px ${stage.color}44`
                  }}
                >
                  <div className="absolute top-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black">
                    {stage.id}
                  </div>
                  <span className="text-3xl font-black mb-1">{stage.label}</span>
                  <div className="w-8 h-1 bg-white/30 rounded-full" />
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors" />
                </div>
              </motion.div>

              <motion.div
                animate={{ 
                  x: labelX,
                  y: labelY,
                  opacity: isActive ? 0 : 1,
                  scale: isDimmed ? 0.8 : 1
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap bg-white/95 backdrop-blur-lg px-6 py-3 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-slate-100/80 z-[60] pointer-events-none"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full shadow-sm" style={{ backgroundColor: stage.color }} />
                  <p className="text-slate-800 font-extrabold text-sm">{stage.question}</p>
                </div>
              </motion.div>
            </React.Fragment>
          );
        })}
      </div>

      <div className="absolute inset-0 border border-slate-100 rounded-full scale-[1.2] opacity-50" />
      <div className="absolute inset-0 border-[4px] border-dotted border-slate-200 rounded-full scale-[1.4] opacity-20 animate-[spin_100s_linear_infinite]" />
    </div>
  );
};

const Header = ({ title, subtitle }: { title: string, subtitle: string }) => (
  <div className="text-right flex flex-col gap-2">
    <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
      {title}
    </h1>
    <div className="flex items-center gap-3">
       <div className="h-1.5 w-12 bg-brand-teal rounded-full" />
       <p className="text-lg font-bold text-slate-400">{subtitle}</p>
    </div>
  </div>
);

const StageDetail = ({ stage, onBack, onNext, onPrev }: { stage: StageData, onBack: () => void, onNext?: () => void, onPrev?: () => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="w-full max-w-7xl mx-auto py-10 px-6 flex flex-col gap-10"
    >
      {/* Navigation & Header */}
      <div className="flex flex-col md:flex-row items-end justify-between gap-6 pb-8 border-b border-slate-100">
        <div className="flex items-center gap-6">
           <div 
             className="w-20 h-20 rounded-[2rem] flex items-center justify-center text-white text-4xl font-black shadow-2xl relative"
             style={{ backgroundColor: stage.color }}
           >
              <span className="relative z-10">{stage.id}</span>
              <div className="absolute inset-0 bg-white/20 rounded-[2rem] blur-xl opacity-30 animate-pulse" />
           </div>
           <Header title={`مرحلة ${stage.label}`} subtitle={stage.title} />
        </div>

        <div className="flex gap-3">
          {onPrev && (
            <button onClick={onPrev} className="p-4 bg-white border border-slate-100 rounded-2xl hover:bg-slate-50 transition-all shadow-sm">
              <ChevronRight className="w-6 h-6 text-slate-400" />
            </button>
          )}
          {onNext && (
            <button onClick={onNext} className="p-4 bg-white border border-slate-100 rounded-2xl hover:bg-slate-50 transition-all shadow-sm">
              <ChevronLeft className="w-6 h-6 text-slate-400" />
            </button>
          )}
          <button 
            onClick={onBack}
            className="flex items-center gap-3 px-8 py-4 bg-brand-teal text-white rounded-2xl transition-all font-black text-sm shadow-xl shadow-brand-teal/20 hover:scale-105 active:scale-95"
          >
            العودة للنموذج الرئيسي
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Goal Card (Full Width) */}
        <div className="lg:col-span-12 relative mt-6">
           <div 
             className="absolute -top-5 right-10 z-30 inline-flex items-center gap-3 px-6 py-2.5 rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.15)] border border-white/20"
             style={{ backgroundColor: stage.color }}
           >
              <Target className="w-4 h-4 text-white" />
              <span className="text-white font-black text-[10px] tracking-widest leading-none">الهدف من المرحلة</span>
           </div>
           <div className="bg-slate-900 rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-10 text-white relative overflow-hidden shadow-2xl shadow-slate-900/20 border border-white/5">
              <div className="absolute top-0 right-0 w-2 h-full" style={{ backgroundColor: stage.color }} />
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-10 relative z-10 text-right">
                 <div className="shrink-0 p-5 bg-white/10 backdrop-blur-2xl rounded-[1.5rem] border border-white/10 shadow-inner order-first md:order-last">
                    {React.cloneElement(stage.icon as React.ReactElement, { className: "w-10 h-10 text-white" })}
                 </div>
                 <div className="flex-1">
                    <p className="text-xl md:text-[1.7rem] font-bold leading-relaxed md:leading-[1.5] text-justify tracking-tight opacity-95">
                      {stage.goal}
                    </p>
                 </div>
              </div>
           </div>
        </div>

        {/* Mid Section: Execution (8) & Timeline (4) */}
        <div className="lg:col-span-8">
           <section className="bg-white rounded-[3rem] p-10 shadow-xl border border-slate-50 group h-full">
              <div className="flex items-center gap-4 mb-10 text-brand-teal">
                 <div className="p-4 bg-brand-teal/5 rounded-2xl">
                    <Lightbulb className="w-8 h-8" />
                 </div>
                 <h3 className="text-3xl font-black">كيف تُنفذ عملياً؟</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {stage.howApplied.map((item, i) => (
                    <div key={i} className="flex gap-5 p-6 rounded-3xl bg-slate-50 hover:bg-white transition-all border border-transparent hover:border-brand-teal/20 hover:shadow-lg group/item">
                       <div className="w-10 h-10 rounded-2xl bg-white border border-slate-100 flex items-center justify-center font-black text-brand-teal text-lg shrink-0 shadow-sm group-hover/item:bg-brand-teal group-hover/item:text-white transition-colors">
                          {i + 1}
                       </div>
                       <p className="text-lg font-bold text-slate-700 leading-relaxed text-justify">
                         {item}
                       </p>
                    </div>
                 ))}
              </div>
           </section>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-8">
           <section className="bg-slate-900 rounded-[3rem] p-8 md:p-10 text-white shadow-2xl shadow-slate-900/20 relative overflow-hidden group h-full flex flex-col justify-between min-h-[400px]">
              <div className="absolute top-0 right-0 w-2 h-full" style={{ backgroundColor: stage.color }} />
              
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                 <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
                       <Clock className="w-6 h-6 text-white/60" />
                    </div>
                    <h3 className="text-lg font-black tracking-widest uppercase opacity-80">الخطة الزمنية</h3>
                 </div>
                 <div className="w-12 h-1 bg-white/10 rounded-full" />
              </div>

              {/* Info Split */}
              <div className="flex flex-col gap-10 relative z-10">
                 {/* Duration */}
                 <div className="flex items-start gap-6 group/item">
                    <div className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 transition-all duration-500 group-hover/item:bg-white/10 group-hover/item:scale-110">
                       <Calendar className="w-8 h-8" style={{ color: stage.color }} />
                    </div>
                    <div>
                       <p className="text-base font-black text-white/60 mb-1 uppercase tracking-[0.2em]">مدة المرحلة</p>
                       <p className="text-4xl font-black tracking-tight">{stage.duration}</p>
                    </div>
                 </div>

                 {/* Divider */}
                 <div className="h-px w-full bg-gradient-to-l from-transparent via-white/10 to-transparent" />

                 {/* Starting Point */}
                 <div className="flex items-start gap-6 group/item">
                    <div className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 transition-all duration-500 group-hover/item:bg-white/10 group-hover/item:scale-110">
                       <Flag className="w-8 h-8 text-white" />
                    </div>
                    <div>
                       <p className="text-base font-black text-white/60 mb-1 uppercase tracking-[0.2em]">بداية التنفيذ</p>
                       <p className="text-3xl font-black tracking-tight">{stage.startWeek}</p>
                    </div>
                 </div>
              </div>

              {/* Decorative Circle */}
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/5 rounded-full blur-[100px] pointer-events-none" />
           </section>
        </div>

        {/* Lower Section: Outputs (4), KPIs (4), Tools (4) - Horizontal Layout */}
        <div className="lg:col-span-12">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Outputs */}
              <section className="bg-slate-50 rounded-[3rem] p-8 shadow-sm border border-slate-200/50 flex flex-col group transition-all duration-500 hover:shadow-xl hover:shadow-brand-teal/5">
                 <div className="flex items-center justify-between mb-8 pb-5 border-b border-slate-200">
                    <div className="flex items-center gap-3 text-slate-800">
                       <div className="p-2.5 bg-brand-teal rounded-xl shadow-lg shadow-brand-teal/20">
                          <FileText className="w-5 h-5 text-white" />
                       </div>
                       <h3 className="text-xl font-black">المخرجات</h3>
                    </div>
                 </div>
                 <div className="space-y-3 flex-1">
                    {stage.outputs.map((out, i) => (
                       <div key={i} className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm transition-all hover:border-brand-teal/30">
                          <CheckCircle2 className="w-5 h-5 text-brand-teal shrink-0" />
                          <span className="text-base font-bold text-slate-700 leading-tight">{out}</span>
                       </div>
                    ))}
                 </div>
              </section>

              {/* KPIs */}
              <section className="bg-brand-green/[0.04] rounded-[3rem] p-8 shadow-sm border border-brand-green/10 flex flex-col group transition-all duration-500 hover:shadow-xl hover:shadow-brand-green/5">
                 <div className="flex items-center justify-between mb-8 pb-5 border-b border-brand-green/20">
                    <div className="flex items-center gap-3 text-slate-800">
                       <div className="p-2.5 bg-brand-green rounded-xl shadow-lg shadow-brand-green/20">
                          <Activity className="w-5 h-5 text-white" />
                       </div>
                       <h3 className="text-xl font-black">مؤشرات الإنجاز</h3>
                    </div>
                 </div>
                 <div className="space-y-3 flex-1">
                    {stage.kpis.map((kpi, i) => (
                       <div key={i} className="flex items-start gap-4 p-4 bg-white/70 backdrop-blur-sm rounded-2xl border border-white shadow-sm transition-all">
                          <div className="w-2 h-2 rounded-full bg-brand-green mt-2.5 shrink-0 shadow-[0_0_10px_rgba(140,195,66,0.5)]" />
                          <span className="text-base font-bold text-slate-700 leading-snug">{kpi}</span>
                       </div>
                    ))}
                 </div>
              </section>

              {/* Tools */}
              <section className="bg-brand-gray/[0.05] rounded-[3rem] p-8 border border-brand-gray/20 flex flex-col group transition-all duration-500 hover:bg-brand-gray/[0.1]">
                 <div className="flex items-center justify-between mb-8 pb-5 border-b border-brand-gray/20">
                    <div className="flex items-center gap-3 text-slate-800">
                       <div className="p-2.5 bg-brand-gray rounded-xl shadow-lg">
                          <Hammer className="w-5 h-5 text-white" />
                       </div>
                       <h3 className="text-xl font-black">الأدوات المستخدمة</h3>
                    </div>
                 </div>
                 <div className="space-y-3">
                    {stage.tools.map((tool, i) => (
                       <div key={i} className="flex items-center gap-4 bg-white/50 backdrop-blur-sm p-4 rounded-2xl text-slate-700 font-bold text-base shadow-sm border border-white">
                          <div className="w-2 h-2 rounded-sm rotate-45 shadow-sm shrink-0" style={{ backgroundColor: stage.color }} />
                          <span className="leading-tight">{tool}</span>
                       </div>
                    ))}
                 </div>
              </section>
           </div>
        </div>

        {/* Decision Gate */}
        <div className="lg:col-span-12 relative mt-8 mb-12">
           <div className="absolute -top-5 right-10 z-30 inline-flex items-center gap-3 px-6 py-2.5 rounded-xl shadow-lg border border-white/10" style={{ backgroundColor: stage.color }}>
              <Gavel className="w-4 h-4 text-white" />
              <span className="text-white font-black text-[10px] tracking-widest leading-none">بوابة القرار</span>
           </div>
           <section className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-slate-100 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-2 h-full opacity-50" style={{ backgroundColor: stage.color }} />
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-14 relative z-10 text-right w-full">
                 <div className="shrink-0 p-5 bg-slate-50 rounded-[1.5rem] border border-slate-100 shadow-inner order-first md:order-last">
                    <Gavel className="w-10 h-10" style={{ color: stage.color }} />
                 </div>
                 <div className="flex-1">
                    <p className="text-2xl md:text-[2.2rem] font-black text-slate-800 leading-relaxed md:leading-[1.6]">
                      "{stage.decisionGate}"
                    </p>
                 </div>
              </div>
           </section>
        </div>
      </div>
    </motion.div>
  );
};

// --- Main Application ---

export default function App() {
  const [view, setView] = useState<'intro' | 'hub' | 'detail'>('intro');
  const [activeStageId, setActiveStageId] = useState<number | null>(null);

  const handleStageSelect = (id: number) => {
    setActiveStageId(id);
    setView('detail');
  };

  const handleNavigate = (direction: 'next' | 'prev') => {
    if (activeStageId === null) return;
    const nextId = direction === 'next' 
      ? (activeStageId + 1) % STAGES.length 
      : (activeStageId - 1 + STAGES.length) % STAGES.length;
    setActiveStageId(nextId);
  };

  return (
    <div className="min-h-screen bg-[#fcfdfe] font-sans selection:bg-brand-teal/20 overflow-x-hidden">
      
      {/* Background decoration elements */}
      <div className="fixed top-0 right-0 w-[50vw] h-[50vw] bg-brand-teal/[0.02] rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[40vw] h-[40vw] bg-brand-green/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <AnimatePresence mode="wait">
        
        {/* Intro View (PDF Page 1 Style) */}
        {view === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex items-center justify-center min-h-screen p-6"
          >
            <div className="max-w-5xl w-full flex flex-col items-center text-center gap-12">
              <div className="flex flex-col items-center gap-8 mb-10">
                 <TraofLogo className="w-32 h-32" />
                 <div className="space-y-4">
                    <h2 className="text-brand-teal text-4xl md:text-6xl font-black tracking-tight leading-tight">
                       وثيقة مشروع إعداد الخطة الاستراتيجية الخامسة لجمعية <span className="text-brand-green">تراؤف</span>
                    </h2>
                    <p className="text-xl md:text-2xl font-bold text-slate-500 max-w-3xl">
                       منهجية مستنيرة وقابلة للقياس والاعتماد، لرسم ملامح المستقبل من 2027 إلى 2030
                    </p>
                 </div>
              </div>

              <div className="w-64 h-1 bg-slate-100 rounded-full" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
                 <button 
                   onClick={() => setView('hub')}
                   className="group p-8 bg-slate-900 rounded-[3rem] text-white flex flex-col items-center gap-6 shadow-2xl hover:bg-brand-teal transition-all hover:-translate-y-2"
                 >
                    <div className="p-5 bg-white/10 rounded-3xl group-hover:bg-white/20 transition-colors">
                       <BarChart3 className="w-10 h-10" />
                    </div>
                    <div className="text-center">
                       <span className="block text-2xl font-black mb-1">النموذج الاستراتيجي</span>
                       <span className="text-sm opacity-60 font-bold uppercase tracking-widest">Traof Model</span>
                    </div>
                 </button>
                 <button 
                   onClick={() => { setActiveStageId(0); setView('detail'); }}
                   className="group p-8 bg-white border-2 border-slate-900 rounded-[3rem] text-slate-900 flex flex-col items-center gap-6 shadow-xl hover:bg-slate-50 transition-all hover:-translate-y-2"
                 >
                    <div className="p-5 bg-slate-900 rounded-3xl group-hover:scale-110 transition-transform">
                       <Flag className="w-10 h-10 text-white" />
                    </div>
                    <div className="text-center">
                       <span className="block text-2xl font-black mb-1">رحلة التخطيط الميدانية</span>
                       <span className="text-sm opacity-40 font-bold uppercase tracking-widest">Journey Roadmap</span>
                    </div>
                 </button>
              </div>

              <div className="mt-10 flex items-center gap-4 text-slate-400 font-black text-xs uppercase tracking-[0.3em]">
                 <span>Traof Strategy Edition</span>
                 <div className="w-2 h-2 rounded-full bg-slate-200" />
                 <span>2027-2030</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Hub View (PDF Page 2 Style) */}
        {view === 'hub' && (
          <motion.div
            key="hub"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center justify-center min-h-screen py-20 px-6 gap-20"
          >
            <div className="text-center max-w-2xl px-6 relative">
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-6 py-2 bg-brand-teal/10 rounded-full border border-brand-teal/20">
                 <span className="text-brand-teal font-black text-[10px] uppercase tracking-[0.4em]">Strategic Model Framework</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
                 نموذج تراؤف للتخطيط التنموي الاستراتيجي
              </h1>
              <p className="text-lg font-bold text-slate-400">
                 خمس مراحل متكاملة تقود عملية التحول من تحليل الغاية إلى حوكمة الأثر
              </p>
            </div>

            <HubCircle 
              onStageSelect={handleStageSelect} 
              activeStage={null} 
            />

            <button 
              onClick={() => setView('intro')}
              className="mt-10 flex items-center gap-3 px-8 py-3 rounded-full text-slate-400 font-bold hover:text-slate-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              العودة للواجهة الرئيسية
            </button>
          </motion.div>
        )}

        {/* Detail View (PDF Stage Layouts) */}
        {view === 'detail' && activeStageId !== null && (
          <motion.div key="detail" className="w-full min-h-screen">
             <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100 flex items-center justify-between px-8 py-4">
                <div className="flex items-center gap-4 cursor-pointer" onClick={() => setView('intro')}>
                   <TraofLogo className="w-10 h-10" />
                   <div className="text-right hidden sm:block">
                      <p className="text-slate-900 font-black text-sm leading-tight">جمعية تراؤف</p>
                      <p className="text-[10px] text-slate-400 font-bold">نموذج التخطيط الاستراتيجي</p>
                   </div>
                </div>

                <div className="flex items-center justify-center gap-2">
                   {STAGES.map(s => (
                     <div 
                        key={s.id}
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${s.id === activeStageId ? 'w-8 bg-brand-teal' : 'bg-slate-200'}`}
                        onClick={() => setActiveStageId(s.id)}
                     />
                   ))}
                </div>

                <button 
                  onClick={() => setView('hub')}
                  className="p-3 hover:bg-slate-50 rounded-xl transition-colors"
                >
                   <ClipboardCheck className="w-6 h-6 text-slate-400" />
                </button>
             </header>

             <StageDetail 
               stage={STAGES.find(s => s.id === activeStageId)!} 
               onBack={() => setView('hub')}
               onNext={activeStageId < STAGES.length - 1 ? () => handleNavigate('next') : undefined}
               onPrev={activeStageId > 0 ? () => handleNavigate('prev') : undefined}
             />
          </motion.div>
        )}

      </AnimatePresence>

      {/* Persistent Visual Footer */}
      {view !== 'detail' && (
        <footer className="fixed bottom-8 left-0 right-0 flex justify-center pointer-events-none">
           <div className="bg-white/80 backdrop-blur p-4 rounded-3xl border border-slate-200/50 shadow-sm flex items-center gap-6">
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">Traof Strategic Excellence</span>
              <div className="w-1 h-1 rounded-full bg-slate-200" />
              <div className="flex gap-2">
                 <div className="w-3 h-3 rounded-full bg-brand-teal" />
                 <div className="w-3 h-3 rounded-full bg-brand-green" />
                 <div className="w-3 h-3 rounded-full bg-brand-gray" />
              </div>
           </div>
        </footer>
      )}
    </div>
  );
}
