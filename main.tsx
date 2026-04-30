/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Target, 
  Search, 
  Zap, 
  Share2, 
  ClipboardCheck, 
  ChevronRight, 
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
  FileCheck,
  Gavel
} from 'lucide-react';

// --- Types ---
type StageKey = number;

interface StageData {
  id: number;
  label: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  goal: string;
  howApplied: string[];
  methodology: string[];
  outputs: string[];
  kpis: string[];
  tools: string[];
  duration: string;
  startWeek: string;
  roles: {
    responsible: string;
    reviewer: string;
    consultant: string;
    informed: string;
  };
  decisionGate: string;
  color: string;
}

// --- Content Data Updated from PDF OCR and Reference Image ---
const STAGES: StageData[] = [
  {
    id: 1,
    label: 'تمركز',
    title: 'مرحلة الغاية والمعنيين',
    icon: <Target className="w-16 h-16" />,
    description: 'تحليل الغاية المؤسسية وفهم الدور التنموي للجمعية في سياقها المحلي والوطني.',
    goal: 'هي مرحلة تأسيسية تفسيرية تراجع فيها الجمعية إطارها الاستراتيجي الحاكم، وتعيد قراءة غايتها الأصيلة ودورها التنموي، وتحدد المعنيين الرئيسيين والفئات ذات الأولوية، وتستخلص القضايا التنموية الجوهرية وفرضيات الأثر العليا التي ستوجه بقية مراحل المشروع.',
    howApplied: [
      'مراجعة الإطار الاستراتيجي وعقد جلسات مركزة لفهم الغاية الأصيلة للجمعية.',
      'تحليل المعنيين الرئيسيين وتحديد الفئات ذات الأولوية وفق الرسالة والاحتياج.',
      'استخلاص القضايا التنموية الجوهرية وصياغة فرضيات الأثر العليا لتوجيه المراحل اللاحقة.'
    ],
    methodology: [
      'ورش عمل',
      'مقابلات نوعية',
      'جلسات تركيز مع المعنيين',
      'عمل مكتبي'
    ],
    outputs: [
      'توصيف الغاية الأصيلة للجمعية',
      'خريطة المعنيين الرئيسيين',
      'تحديد الفئات ذات الأولوية',
      'مصفوفة علاقة المعنيين بالغاية',
      'مصفوفة عروض القيمة',
      'القضايا التنموية الجوهرية المعتمدة',
      'فرضيات الأثر العليا'
    ],
    kpis: [
      'اكتمال توصيف الغاية الأصيلة',
      'اكتمال خريطة المعنيين الرئيسيين',
      'اكتمال تحديد الفئات ذات الأولوية',
      'اكتمال تحديد القضايا التنموية الجوهرية',
      'اكتمال صياغة فرضيات الأثر العليا'
    ],
    tools: [
      'وثيقة الإطار الاستراتيجي',
      'مصفوفة تحليل المعنيين الرئيسيين',
      'نموذج تحديد الفئات ذات الأولوية',
      'نموذج ترجيح القضايا التنموية الجوهرية',
      'أداة صياغة فرضيات الأثر العليا',
      'الوثائق المرجعية ذات العلاقة'
    ],
    duration: 'من 4-28 إلى 4-30',
    startWeek: 'الأسبوع 18',
    roles: {
      responsible: 'مكتب إدارة الاستراتيجية - فريق التخطيط',
      reviewer: 'مكتب إدارة الاستراتيجية',
      consultant: 'خبراء في مجال التخطيط',
      informed: 'القيادة العليا - فريق العمل'
    },
    decisionGate: 'اعتماد الغاية الأصيلة، والمعنيين الرئيسيين، والفئات ذات الأولوية، والقضايا التنموية الجوهرية، وفرضيات الأثر العليا.',
    color: '#13776B' 
  },
  {
    id: 2,
    label: 'رصد',
    title: 'مرحلة التحليل الاستراتيجي',
    icon: <Search className="w-16 h-16" />,
    description: 'تحليل البيئة الداخلية والخارجية لاستكشاف الفرص ومواجهة التحديات.',
    goal: 'فهم الواقع المؤسسي للجمعية فهماً شاملاً من خلال تحليل البيئة الداخلية والخارجية، وربط نتائجها لاستخلاص نقاط القوة والضعف، والفرص والتهديدات، والميزة التنافسية وعوامل النجاح الحاسمة والقضايا الاستراتيجية.',
    howApplied: [
      'مسح البيئة الخارجية والداخلية باستخدام نماذج تحليل معتمدة.',
      'عقد ورش عمل للعصف الذهني لتصنيف العوامل المؤثرة.',
      'بناء مصفوفة الربط بين النتائج لاستخلاص القضايا الاستراتيجية.'
    ],
    methodology: [
      'تحليل SWOT',
      'تحليل PESTEL',
      'استبانات إلكترونية',
      'ورش عمل تحليلية'
    ],
    outputs: [
      'تقرير التحليل الاستراتيجي الشامل',
      'مصفوفة العوامل الداخلية والخارجية',
      'الميزة التنافسية وعوامل النجاح',
      'القضايا الاستراتيجية الرئيسية للمرحلة',
      'مصفوفة ربط العوامل التحليلية'
    ],
    kpis: [
      'اكتمال تحليل البيئة الداخلية والخارجية',
      'اكتمال ربط نتائج التحليل',
      'اكتمال تقرير التحليل الاستراتيجي',
      'اكتمال تحديد القضايا الاستراتيجية'
    ],
    tools: [
      'أدوات تحليل SWOT/PESTEL',
      'استبانات التحليل المؤسسي',
      'مصفوفة ربط العوامل',
      'نماذج المقابلات الاستراتيجية'
    ],
    duration: 'من 5-1 إلى 5-15',
    startWeek: 'الأسبوع 20',
    roles: {
      responsible: 'فريق التحليل - مكتب الاستراتيجية',
      reviewer: 'مدير مكتب الاستراتيجية',
      consultant: 'مستشارين خارجيين',
      informed: 'رؤساء الأقسام'
    },
    decisionGate: 'اعتماد تقرير التحليل الاستراتيجي النهائي وتحديد الميزة التنافسية وعوامل النجاح.',
    color: '#4B5563' 
  },
  {
    id: 3,
    label: 'أثر',
    title: 'مرحلة بناء الخطة الاستراتيجية',
    icon: <Zap className="w-16 h-16" />,
    description: 'صياغة التوجه الاستراتيجي وتحديد الأثر التنموي المستهدف.',
    goal: 'بناء التوجه والخطة الاستراتيجية للجمعية في ضوء الغاية الأصيلة ومخرجات التحليل الاستراتيجي، من خلال تحديد الأثر المستهدف، وترجيح الخيارات والأولويات، وصياغة الرؤية والرسالة والقيم وبناء نظرية التغيير.',
    howApplied: [
      'صياغة التوجه الاستراتيجي الجديد للجمعية.',
      'بناء نظرية التغيير لضمان تحقيق الأثر.',
      'تصميم الخريطة الاستراتيجية وربط الأهداف.'
    ],
    methodology: [
      'ورش عمل تفاعلية',
      'جلسات نمذجة الأداء',
      'مراجعات القيادة',
      'نمذجة التغيير'
    ],
    outputs: [
      'الأثر الاستراتيجي المستهدف والخيارات',
      'الرؤية والرسالة والقيم المؤسسية',
      'نموذج نظرية التغيير الاستراتيجي',
      'الأهداف الاستراتيجية ومؤشرات الأداء',
      'الخريطة الاستراتيجية المتكاملة (أثر)'
    ],
    kpis: [
      'اكتمال تسليم مخرجات التوجه',
      'اعتماد نظرية التغيير والأهداف',
      'اعتماد الخريطة الاستراتيجية'
    ],
    tools: [
      'نموذج صياغة الرؤية والرسالة',
      'أداة بناء نظرية التغيير',
      'قالب الخريطة الاستراتيجية',
      'دليل صياغة الأهداف SMART'
    ],
    duration: 'من 5-16 إلى 6-10',
    startWeek: 'الأسبوع 23',
    roles: {
      responsible: 'لجنة الخطة - مكتب الاستراتيجية',
      reviewer: 'مجلس الإدارة',
      consultant: 'مستشار استراتيجي',
      informed: 'كافة منسوبي الجمعية'
    },
    decisionGate: 'اعتماد التوجه الاستراتيجي (الرؤية، الرسالة، القيم) ونظرية التغيير والخريطة الاستراتيجية.',
    color: '#1C7C9C' 
  },
  {
    id: 4,
    label: 'وصل',
    title: 'مرحلة الترجمة إلى التنفيذ',
    icon: <Share2 className="w-16 h-16" />,
    description: 'تحويل الأهداف إلى مبادرات وخطط تكتيكية قابلة للتنفيذ.',
    goal: 'ترجمة الخطة الاستراتيجية المعتمدة إلى منظومة تنفيذ واضحة، من خلال تصميم المبادرات الاستراتيجية، واستكمال البناء الفني لمؤشرات الأهداف، ومواءمة الهيكل والعمليات والأدوار، وإعداد الخطة التنفيذية وإدارة المخاطر.',
    howApplied: [
      'تصميم بطاقات المبادرات والمشاريع الاستراتيجية.',
      'صياغة بطاقات مؤشرات الأداء الفنية (KPIs).',
      'مواءمة الموازنات المالية مع الأولويات.'
    ],
    methodology: [
      'تصميم المبادرات',
      'مواءمة تنظيمية',
      'تخطيط مالي',
      'إدارة مخاطر'
    ],
    outputs: [
      'بطاقات المبادرات الاستراتيجية',
      'مصفوفة ترتيب المبادرات',
      'التوصيف الفني لمؤشرات الأداء',
      'الخطة التنفيذية مواءمة بالهيكل',
      'خطة إدارة المخاطر الاستراتيجية'
    ],
    kpis: [
      'اكتمال تصميم المبادرات',
      'اكتمال التوصيف الفني للمؤشرات',
      'اكتمال مواءمة الهيكل والعمليات',
      'اكتمال إعداد الخطة التنفيذية'
    ],
    tools: [
      'نموذج بطاقة المبادرة',
      'دليل مؤشرات الأداء',
      'قالب الخطة التنفيذية',
      'سجل المخاطر الاستراتيجية'
    ],
    duration: 'من 6-11 إلى 6-30',
    startWeek: 'الأسبوع 27',
    roles: {
      responsible: 'مدراء الإدارات - مكتب الاستراتيجية',
      reviewer: 'المدير التنفيذي',
      consultant: 'أخصائي تخطيط تنفيذي',
      informed: 'فريق التنفيذ'
    },
    decisionGate: 'اعتماد محفظة المبادرات الاستراتيجية والخطة التنفيذية السنوية من قبل مجلس الإدارة.',
    color: '#7BA444' 
  },
  {
    id: 5,
    label: 'فحص',
    title: 'مرحلة حوكمة الخطة الاستراتيجية',
    icon: <ClipboardCheck className="w-16 h-16" />,
    description: 'بناء نظام لمراقبة الأداء وضمان تحقيق النتائج المنشودة.',
    goal: 'بناء إطار حوكمة ومتابعة للخطة الاستراتيجية يحدد آليات قياس الأداء، والمراجعة الدورية، والتصعيد، وسد فجوات الجاهزية، وإعداد التقارير، بما يضمن تنفيذاً منضبطاً ومتابعة مستمرة واتخاذ قرار مبني على الأداء.',
    howApplied: [
      'تصميم منهجية رصد ورفع التقارير الدورية.',
      'بناء لوحات قيادة رقمية لمتابعة الإنجاز.',
      'تحديد مستويات الصلاحية واتخاذ القرار.'
    ],
    methodology: [
      'تحليل الفجوات',
      'تصميم الحوكمة',
      'بناء لوحات القيادة',
      'تدريب المنسوبين'
    ],
    outputs: [
      'تحليل فجوة الجاهزية وخطة سدها',
      'منهجية متابعة الأداء الاستراتيجي',
      'آليات التصعيد ونماذج التقارير',
      'لوحة القيادة الاستراتيجية',
      'إطار حوكمة شامل لمتابعة التنفيذ'
    ],
    kpis: [
      'اكتمال تحليل فجوة الجاهزية',
      'اكتمال بناء إطار الحوكمة',
      'اكتمال تصميم آلية التصعيد',
      'اكتمال بناء لوحة القيادة'
    ],
    tools: [
      'دليل حوكمة الاستراتيجية',
      'قوالب تقارير الأداء',
      'مصفوفة الصلاحيات (RACI)',
      'نظام لوحة القيادة (Dashboard)'
    ],
    duration: 'من 7-1 إلى 7-15',
    startWeek: 'الأسبوع 30',
    roles: {
      responsible: 'مكتب حوكمة الاستراتيجية',
      reviewer: 'مجلس الإدارة - الأداء',
      consultant: 'خبير حوكمة مؤسسية',
      informed: 'كافة مدراء المبادرات'
    },
    decisionGate: 'تفعيل إطار الحوكمة والمتابعة واعتماده رسمياً لبدء دورة القياس والتقييم الاستراتيجي.',
    color: '#2E9B8F' 
  }
];

// --- Components ---

const HubCircle = ({ onStageSelect, activeStage }: { onStageSelect: (s: StageKey) => void, activeStage: StageKey | null }) => {
  return (
    <div className="relative w-full max-w-[700px] aspect-square flex items-center justify-center transition-all duration-700">
      {/* Central Identity Sphere */}
      <motion.div 
        animate={{ 
          scale: activeStage !== null ? 0.75 : 1,
          opacity: activeStage !== null ? 0.5 : 1 
        }}
        className="relative z-30 w-[260px] h-[260px] rounded-full bg-white flex flex-col items-center justify-center text-center shadow-[inset_0_-20px_40px_rgba(0,0,0,0.02),0_40px_80px_rgba(0,0,0,0.1)] border border-slate-50 p-6"
      >
         <div className="flex items-center gap-1 mb-2">
           <div className="w-3 h-3 rounded-full bg-[#84cc16]" />
           <div className="w-3 h-3 rounded-full bg-[#14b8a6]" />
         </div>
         <h2 className="text-4xl font-bold text-slate-800 tracking-tighter">تراؤف</h2>
         <p className="text-xl font-medium text-slate-300 tracking-[0.3em] mt-1 mb-4">TRAOF</p>
         <div className="w-16 h-1 bg-brand-blue/20 rounded-full" />
      </motion.div>

      {/* Petals Container */}
      <div className="absolute inset-0 z-20">
        {STAGES.map((stage) => {
          // Precise positions for petals based on reference
          const stageConfigs: Record<number, { angle: number, labelDir: {x: number, y: number} }> = {
            1: { angle: -125, labelDir: { x: -220, y: -220 } }, // Top Left - تمركز
            2: { angle: -30, labelDir: { x: 220, y: -200 } },   // Top Right - رصد
            3: { angle: 15, labelDir: { x: 280, y: 120 } },    // Center Right - أثر
            4: { angle: 95, labelDir: { x: 0, y: 300 } },      // Bottom - وصل
            5: { angle: 185, labelDir: { x: -280, y: 120 } }   // Center Left - فحص
          };
          
          const config = stageConfigs[stage.id];
          const isActive = activeStage === stage.id;
          const isDimmed = activeStage !== null && !isActive;
          
          return (
            <div key={stage.id} className="absolute inset-0 flex items-center justify-center">
              {/* Petal Swish SVG */}
              <motion.div
                animate={{ 
                  rotate: config.angle,
                  scale: isActive ? 1.2 : (isDimmed ? 0.8 : 1),
                  opacity: isDimmed ? 0.1 : 1,
                }}
                transition={{ type: "spring", stiffness: 80, damping: 20 }}
                className="absolute origin-center cursor-pointer pointer-events-auto"
                onClick={() => onStageSelect(stage.id)}
              >
                <svg width="260" height="260" viewBox="0 0 100 100" className="drop-shadow-2xl overflow-visible">
                   <path 
                     d="M 50 50 L 90 15 Q 115 40 90 90 L 50 50" 
                     fill={stage.color}
                     className="transition-colors duration-500"
                   />
                   {/* Number identifier inside petal - rotated back to be readable */}
                   <text 
                     x="88" y="55" 
                     fill="white" 
                     fontSize="10" 
                     fontWeight="900" 
                     textAnchor="middle"
                     transform={`rotate(${-config.angle} 88 55)`}
                   >
                     {stage.id}
                   </text>
                </svg>
              </motion.div>

              {/* Horizontal Text Label - Non-rotated */}
              <motion.div 
                animate={{ 
                  x: config.labelDir.x,
                  y: config.labelDir.y,
                  opacity: isDimmed ? 0 : 1,
                  scale: isActive ? 1.15 : (isDimmed ? 0.7 : 1),
                  zIndex: isActive ? 100 : 50
                }}
                className="absolute pointer-events-auto cursor-pointer"
                onClick={() => onStageSelect(stage.id)}
              >
                <div 
                  className={`text-2xl font-black text-slate-800 tracking-tight whitespace-nowrap px-8 py-4 rounded-2xl shadow-xl transition-all duration-300
                    ${isActive ? 'bg-brand-blue text-white shadow-brand-blue/30 scale-110' : 'bg-white/80 backdrop-blur-md border border-white hover:bg-white hover:shadow-2xl'}
                  `}
                >
                  {stage.label}
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Decorative Outer Rings */}
      <motion.div 
         animate={{ opacity: activeStage !== null ? 0.05 : 0.2 }}
         className="absolute w-[620px] h-[620px] border-[2px] border-dashed border-slate-300 rounded-full animate-[spin_120s_linear_infinite]"
      />
      <motion.div 
         animate={{ opacity: activeStage !== null ? 0.02 : 0.1 }}
         className="absolute w-[680px] h-[680px] border border-slate-200 rounded-full"
      />
    </div>
  );
};

const StageDetail = ({ stage, onBack, ...props }: { stage: StageData, onBack: () => void, [key: string]: any }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full flex flex-col gap-6 py-6"
    >
      {/* Top Action Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-4 bg-white/50 backdrop-blur-md px-6 py-3 rounded-2xl border border-slate-100 shadow-sm">
           <div className="w-3 h-3 bg-brand-blue rounded-full animate-pulse shadow-[0_0_10px_rgba(28,124,156,0.4)]" />
           <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] font-sans">Strategic Planning Engine</span>
           <span className="text-slate-200">|</span>
           <span className="text-sm font-black text-slate-800">بيئة التخطيط الفعّالة</span>
        </div>
        
        <div className="flex items-center gap-3">
          {stage.id < 5 && (
            <button 
              onClick={() => props.onNextStage(stage.id + 1)}
              className="flex items-center gap-3 px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl transition-all font-black text-sm shadow-xl shadow-emerald-600/10 active:scale-95 group"
            >
              <span>المرحلة التالية</span>
              <ChevronRight className="w-5 h-5 rotate-180 group-hover:-translate-x-1 transition-transform" />
            </button>
          )}
          <button 
            onClick={onBack}
            className="group flex items-center gap-3 px-10 py-3.5 bg-slate-900 hover:bg-brand-blue text-white rounded-2xl transition-all font-black text-sm shadow-xl active:scale-95"
          >
            <ArrowLeft className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            الرجوع للمحرك
          </button>
        </div>
      </div>

      {/* Professional Stage Header Hero */}
      <section className="relative w-full rounded-[40px] overflow-visible shadow-2xl border border-slate-100 bg-white">
        <div className="absolute top-0 right-0 w-4 h-full" style={{ backgroundColor: stage.color }} />
        <div className="p-10 flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="flex items-center gap-8 text-right">
            <div className="relative shrink-0">
               <div className="w-24 h-24 rounded-[30px] flex items-center justify-center text-white shadow-2xl" style={{ backgroundColor: stage.color }}>
                  <span className="text-4xl font-black">{stage.id}</span>
               </div>
            </div>
            <div>
               <h1 className="text-6xl font-black text-slate-900 tracking-tighter mb-2">
                 مرحلة <span style={{ color: stage.color }}>{stage.label}</span>
               </h1>
               <h2 className="text-2xl font-bold text-slate-400">{stage.title}</h2>
            </div>
          </div>

          <div className="flex flex-col items-center lg:items-end gap-2 text-right">
             <div className="border-r-4 border-slate-100 pr-6">
               <span className="text-xs font-black text-brand-blue uppercase tracking-[0.4em] mb-1">جمعية تراؤف</span>
               <div className="text-xl font-black text-slate-800">الاستراتيجية الخامسة <span className="font-sans">2027-2030</span></div>
             </div>
          </div>
        </div>

        {/* Improved Goal Section - Modern Dark Card */}
        <div className="bg-slate-900 border-t border-white/10 p-12 flex flex-col md:flex-row items-center gap-12 rounded-b-[40px] relative overflow-hidden group">
           <div className="absolute inset-0 bg-brand-blue/5 opacity-0 group-hover:opacity-100 transition-opacity" />
           <div className="w-20 h-20 bg-brand-blue rounded-3xl flex items-center justify-center text-white shadow-2xl ring-8 ring-white/5 shrink-0 relative z-10">
              <Target className="w-10 h-10" />
           </div>
           <div className="text-right flex-1 relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-1 w-16 bg-brand-blue rounded-full" />
                <h3 className="text-sm font-black text-brand-blue uppercase tracking-[0.5em]">الهدف الاستراتيجي الجوهري</h3>
              </div>
              <p className="text-4xl font-black text-white leading-[1.4] tracking-tight">
                {stage.goal}
              </p>
           </div>
        </div>
      </section>

      {/* Reorganized Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Methodology, Duration & Tools (Arabic RTL Logic) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
           {/* Prominent Duration Card */}
           <div className="bg-brand-blue rounded-[32px] p-8 text-white shadow-xl shadow-brand-blue/20 flex items-center justify-between group overflow-hidden relative">
              <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform">
                <Clock className="w-32 h-32" />
              </div>
              <div className="relative z-10 text-right">
                <h4 className="text-white/60 text-xs font-black uppercase tracking-widest mb-1">الجدول الزمني للمرحلة</h4>
                <p className="text-3xl font-black">{stage.duration}</p>
              </div>
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md relative z-10">
                <Calendar className="w-7 h-7 text-white" />
              </div>
           </div>

           {/* How Applied Box */}
           <section className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-xl transition-all hover:shadow-2xl">
              <div className="flex items-center gap-3 mb-6 text-brand-blue">
                 <Lightbulb className="w-6 h-6" />
                 <h3 className="text-lg font-black">طريقة التطبيق</h3>
              </div>
              <ul className="space-y-4">
                 {stage.howApplied.map((item, i) => (
                   <li key={i} className="flex gap-4 items-start group">
                     <span className="text-brand-blue/30 font-black mt-1 text-sm group-hover:text-brand-blue transition-colors">{(i+1).toLocaleString('ar-SA')}</span>
                     <p className="text-base font-bold text-slate-600 leading-relaxed">{item}</p>
                   </li>
                 ))}
              </ul>
           </section>

           {/* Tools Box */}
           <section className="bg-emerald-50/50 rounded-[32px] p-8 border border-emerald-100 shadow-lg">
              <div className="flex items-center gap-3 mb-6 text-emerald-700">
                 <Hammer className="w-6 h-6 text-emerald-600" />
                 <h3 className="text-lg font-black">الأدوات المستخدمة</h3>
              </div>
              <div className="flex flex-col gap-2">
                 {stage.tools.map((item, i) => (
                   <div key={i} className="bg-white/80 p-4 rounded-xl border border-emerald-100 flex items-center gap-3 hover:-translate-x-1 transition-transform cursor-default">
                     <div className="w-6 h-6 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700 text-[10px] font-black shrink-0">
                       {(i+1).toLocaleString('ar-SA')}
                     </div>
                     <span className="text-sm font-bold text-slate-700">{item}</span>
                   </div>
                 ))}
              </div>
           </section>
        </div>

        {/* Center/Main Column: Outputs & KPIs */}
        <div className="lg:col-span-8 flex flex-col gap-6">
           
           {/* Outputs Section (Main Focus) */}
           <section className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-xl">
              <div className="flex items-center justify-between mb-8">
                 <div className="flex items-center gap-4 text-emerald-600">
                    <FileCheck className="w-8 h-8" />
                    <h3 className="text-2xl font-black">المخرجات الاستراتيجية</h3>
                 </div>
                 <div className="h-0.5 w-24 bg-emerald-100 rounded-full" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {stage.outputs.map((item, i) => (
                   <div key={i} className="relative p-5 bg-slate-50 rounded-2xl border border-slate-100 group hover:bg-white hover:shadow-xl transition-all cursor-default flex items-center gap-4">
                     <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-slate-300 font-black text-sm group-hover:text-emerald-500 transition-colors">
                        {(i+1).toLocaleString('ar-SA')}
                     </div>
                     <p className="text-lg font-bold text-slate-700 leading-tight">{item}</p>
                   </div>
                 ))}
              </div>
           </section>

           {/* KPIs Section */}
           <section className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-xl">
              <div className="flex items-center gap-4 mb-6 text-amber-600">
                 <Activity className="w-8 h-8" />
                 <h3 className="text-xl font-black">مؤشر الإنجاز</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                 {stage.kpis.map((item, i) => (
                   <div key={i} className="flex items-center gap-3 p-4 bg-slate-50/50 rounded-xl border border-slate-100 hover:border-amber-200 transition-colors">
                      <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
                      <span className="text-sm font-bold text-slate-800 shrink-0">{(i+1).toLocaleString('ar-SA')}.</span>
                      <span className="text-sm font-bold text-slate-600 leading-tight">{item}</span>
                   </div>
                 ))}
              </div>
           </section>

           {/* Decision Gate (Footer Bar) */}
           <section className="bg-slate-900 rounded-[40px] p-12 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-2 bg-brand-blue" />
              <div className="flex flex-col md:flex-row items-center gap-12">
                 <div className="shrink-0 flex items-center gap-6">
                    <div className="w-20 h-20 bg-brand-blue rounded-[25px] flex items-center justify-center text-white shadow-[0_0_40px_rgba(28,124,156,0.3)]">
                      <Gavel className="w-10 h-10" />
                    </div>
                    <div className="text-right">
                       <h4 className="text-brand-blue text-sm font-black uppercase tracking-widest mb-1">بوابة القرار</h4>
                       <span className="text-3xl font-black text-white">اعتماد المرحلة</span>
                    </div>
                 </div>
                 <div className="flex-1 p-6 bg-white/5 rounded-3xl backdrop-blur-sm border border-white/10">
                    <p className="text-2xl font-bold text-slate-300 italic text-center leading-relaxed">
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

/* Helper Components for the Design */
const StatCard = ({ icon, label, value, color, sub }: { icon: React.ReactNode, label: string, value: string, color: string, sub: string }) => (
  <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm flex items-center justify-between hover:shadow-xl transition-all">
    <div className="flex items-center gap-5">
      <div className={`w-14 h-14 bg-slate-50 rounded-[20px] flex items-center justify-center ${color} shadow-inner`}>
        {React.cloneElement(icon as React.ReactElement, { className: "w-7 h-7" })}
      </div>
      <div className="text-right">
        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{label}</h4>
        <p className={`text-2xl font-black ${color} tracking-tight`}>{value}</p>
      </div>
    </div>
    <div className="text-5xl text-slate-50/50 font-black select-none pointer-events-none hidden xl:block">{sub}</div>
  </div>
);

export default function App() {
  const [view, setView] = useState<'intro' | 'dashboard'>('intro');
  const [activeStage, setActiveStage] = useState<StageKey | null>(null);

  const handleStageSelect = (stageId: StageKey) => {
    setActiveStage(stageId);
    setView('dashboard');
  };

  const Sidebar = () => (
    <aside className="high-density-sidebar hidden lg:flex">
      <div className="mb-10 border-b border-slate-700 pb-6 cursor-pointer" onClick={() => setView('intro')}>
        <h1 className="text-xl font-bold tracking-tight text-white mb-1">رحلة التخطيط الاستراتيجي</h1>
        <p className="text-xs text-slate-400 font-medium tracking-wide">دليل التحول المؤسسي 2027-2030</p>
      </div>

      <nav className="space-y-3 flex-1 overflow-y-auto custom-scrollbar">
        <button 
          onClick={() => { setActiveStage(null); setView('dashboard'); }}
          className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all text-right
            ${activeStage === null && view === 'dashboard' ? 'bg-brand-blue shadow-lg' : 'opacity-60 hover:opacity-100 hover:bg-slate-800'}
          `}
        >
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs ring-1 ring-white/30">
            <ClipboardCheck className="w-4 h-4" />
          </div>
          <span className="font-bold text-sm tracking-tight">نموذج تراؤف للتخطيط التنموي الاستراتيجي</span>
        </button>

        <div className="pt-4 pb-2 px-3 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
          مراحل الرحلة
        </div>

        {STAGES.map((stage) => (
          <button
            key={stage.id}
            onClick={() => handleStageSelect(stage.id)}
            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all text-right group
              ${activeStage === stage.id ? 'bg-brand-blue shadow-lg' : 'opacity-40 hover:opacity-100 hover:bg-slate-800'}
            `}
          >
            <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-inner transition-colors
              ${activeStage === stage.id ? 'bg-white text-brand-blue' : 'border border-slate-500 group-hover:border-white'}
            `}>
              {stage.id}
            </span>
            <span className="font-bold text-sm tracking-tight">{stage.label}</span>
          </button>
        ))}
      </nav>

      <div className="pt-6 mt-6 border-t border-slate-700 text-[9px] text-slate-500 uppercase flex justify-between font-mono font-bold">
        <span>Strategic Framework</span>
        <span>تراؤف</span>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen flex font-sans bg-slate-50 overflow-hidden">
      {view === 'dashboard' && <Sidebar />}

      <main className="flex-1 flex flex-col relative overflow-hidden h-screen">
        {/* Navigation Elements */}
        {view === 'dashboard' && activeStage === null && (
          <header className="px-8 py-5 flex justify-between items-center bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
            <div className="flex items-center gap-4 text-xs font-black text-slate-400 uppercase tracking-widest leading-none">
               <span className="bg-slate-100 text-slate-500 px-3 py-1.5 rounded text-[10px] ring-1 ring-slate-200">
                 {activeStage === null ? 'System Overview' : `Detail Level 0${activeStage}`}
               </span>
               <span className="text-slate-300">/</span>
               <span className="text-slate-900 font-bold">
                 {activeStage === null ? 'نموذج تراؤف للتخطيط التنموي الاستراتيجي' : STAGES.find(s => s.id === activeStage)?.title}
               </span>
            </div>
            
            <div className="flex gap-2">
               <button 
                 onClick={() => { setView('intro'); setActiveStage(null); }}
                 className="px-5 py-2 bg-white border border-slate-200 rounded-md text-[11px] font-black uppercase text-slate-600 hover:bg-slate-50 transition-all shadow-sm active:scale-95"
               >
                 البداية
               </button>
               {activeStage !== null && activeStage < 5 && (
                 <button 
                   onClick={() => handleStageSelect(activeStage + 1)}
                   className="px-5 py-2 bg-slate-900 text-white rounded-md text-[11px] font-black uppercase hover:bg-brand-blue transition-all shadow-md active:scale-95 flex items-center gap-2"
                 >
                   المرحلة التالية
                   <ChevronRight className="w-3 h-3 rotate-180" />
                 </button>
               )}
            </div>
          </header>
        )}

        <div className={`flex-1 flex overflow-y-auto custom-scrollbar ${activeStage === null ? 'items-center justify-center p-4 lg:p-8' : 'items-start justify-center p-0'}`}>
          <AnimatePresence mode="wait">
            {view === 'intro' && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="text-center max-w-2xl px-6"
              >
                <div className="w-20 h-20 bg-brand-blue text-white rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-2xl relative">
                  <div className="absolute inset-0 bg-brand-blue rounded-2xl animate-ping opacity-20" />
                  <BarChart3 className="w-10 h-10 relative z-10" />
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 leading-[1.1] tracking-tighter">
                  <span className="text-brand-blue block mb-2 opacity-80">رحلة</span>
                  التخطيط الاستراتيجي
                </h1>
                <p className="text-xl text-slate-500 mb-10 font-medium leading-relaxed">
                  منهجية مكثفة لبناء خطة مؤسسية قابلة للتنفيذ والقياس والاعتماد <br className="hidden md:block" /> لجمعية تراؤف 2027 - 2030
                </p>
                <button
                  onClick={() => setView('dashboard')}
                  className="px-12 py-5 bg-slate-900 text-white rounded-xl text-sm font-black uppercase tracking-[0.2em] shadow-2xl transition-all hover:scale-105 active:scale-95 hover:bg-brand-blue"
                >
                  نموذج تراؤف للتخطيط التنموي الاستراتيجي
                </button>
              </motion.div>
            )}

            {view === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full flex-1 flex flex-col items-center py-8"
              >
                <AnimatePresence mode="wait">
                  {activeStage === null ? (
                    <motion.div
                      key="hub"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.1 }}
                      className="w-full flex flex-col items-center justify-center gap-12 flex-1"
                    >
                      <div className="text-center max-w-2xl px-6">
                        <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tighter">نموذج تراؤف للتخطيط التنموي الاستراتيجي</h2>
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">نظام متكامل لقيادة التحول الاستراتيجي المؤسسي</p>
                      </div>
                      <HubCircle onStageSelect={handleStageSelect} activeStage={null} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="details"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      className="w-full max-w-[1600px] px-6 lg:px-12 pt-12 pb-24"
                    >
                    <StageDetail 
                      stage={STAGES.find(s => s.id === activeStage)!} 
                      onBack={() => setActiveStage(null)} 
                      onNextStage={handleStageSelect}
                    />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {view === 'intro' && (
          <footer className="absolute bottom-0 left-0 right-0 p-8 flex justify-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
             <div className="bg-white/50 backdrop-blur px-6 py-2 rounded-full border border-slate-100 shadow-sm">
                TRAOF Strategic Planning © 2026-2030 Edition
             </div>
          </footer>
        )}
      </main>
    </div>
  );
}
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
