import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EditorFormProps } from "@/lib/types";
import { generalInfoSchema, GeneralInfoValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const templates = [
    {
        name: "Default",
        id: "default",
        svg: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 565">
                <rect width="400" height="565" fill="#ffffff"/>

                <circle cx="50" cy="50" r="30" fill="#e2e8f0"/>
                <rect x="100" y="30" width="150" height="15" fill="#2563eb"/>
                <rect x="100" y="55" width="100" height="10" fill="#2563eb" opacity="0.8"/>
                <rect x="100" y="75" width="200" height="8" fill="#94a3b8"/>

                <line x1="20" y1="120" x2="380" y2="120" stroke="#2563eb" strokeWidth="4"/>
                <rect x="20" y="140" width="120" height="12" fill="#2563eb"/>
                <rect x="20" y="160" width="360" height="8" fill="#64748b"/>
                <rect x="20" y="175" width="360" height="8" fill="#64748b"/>
                <rect x="20" y="190" width="260" height="8" fill="#64748b"/>

                <line x1="20" y1="230" x2="380" y2="230" stroke="#2563eb" strokeWidth="4"/>
                <rect x="20" y="250" width="120" height="12" fill="#2563eb"/>

                <rect x="20" y="280" width="150" height="10" fill="#2563eb"/>
                <rect x="280" y="280" width="100" height="10" fill="#2563eb"/>
                <rect x="20" y="300" width="120" height="8" fill="#64748b"/>
                <rect x="20" y="315" width="360" height="8" fill="#64748b"/>
                <rect x="20" y="330" width="360" height="8" fill="#64748b"/>

                <rect x="20" y="360" width="150" height="10" fill="#2563eb"/>
                <rect x="280" y="360" width="100" height="10" fill="#2563eb"/>
                <rect x="20" y="380" width="120" height="8" fill="#64748b"/>
                <rect x="20" y="395" width="360" height="8" fill="#64748b"/>

                <line x1="20" y1="435" x2="380" y2="435" stroke="#2563eb" strokeWidth="4"/>
                <rect x="20" y="455" width="100" height="12" fill="#2563eb"/>
                <rect x="20" y="485" width="150" height="10" fill="#2563eb"/>
                <rect x="280" y="485" width="100" height="10" fill="#2563eb"/>
                <rect x="20" y="505" width="120" height="8" fill="#64748b"/>

                <line x1="20" y1="535" x2="380" y2="535" stroke="#2563eb" strokeWidth="4"/>
                <rect x="20" y="555" width="70" height="12" fill="#2563eb"/>

                <g transform="translate(20, 580)">
                    <rect width="60" height="20" rx="4" fill="#2563eb"/>
                    <rect x="70" width="70" height="20" rx="4" fill="#2563eb"/>
                    <rect x="150" width="80" height="20" rx="4" fill="#2563eb"/>
                    <rect x="240" width="65" height="20" rx="4" fill="#2563eb"/>
                </g>
            </svg>
        )
    },
    {
        name: "Minimalist",
        id: "minimalist",
        svg: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 565">
                <rect width="400" height="565" fill="#ffffff"/>

                <rect x="100" y="30" width="200" height="20" fill="#1e293b"/>
                <rect x="130" y="60" width="140" height="14" fill="#1e293b" opacity="0.9"/>
                <rect x="70" y="85" width="260" height="10" fill="#94a3b8"/>

                <rect x="20" y="130" width="180" height="16" fill="#1e293b"/>
                <rect x="20" y="155" width="360" height="8" fill="#64748b"/>
                <rect x="20" y="168" width="360" height="8" fill="#64748b"/>
                <rect x="20" y="181" width="260" height="8" fill="#64748b"/>

                <rect x="20" y="220" width="160" height="16" fill="#1e293b"/>

                <rect x="20" y="250" width="300" height="12" fill="#1e293b"/>
                <rect x="20" y="270" width="200" height="8" fill="#94a3b8"/>
                <rect x="20" y="285" width="360" height="8" fill="#64748b"/>
                <rect x="20" y="298" width="360" height="8" fill="#64748b"/>
                <rect x="20" y="311" width="260" height="8" fill="#64748b"/>

                <rect x="20" y="340" width="300" height="12" fill="#1e293b"/>
                <rect x="20" y="360" width="200" height="8" fill="#94a3b8"/>
                <rect x="20" y="375" width="360" height="8" fill="#64748b"/>
                <rect x="20" y="388" width="260" height="8" fill="#64748b"/>

                <rect x="20" y="430" width="120" height="16" fill="#1e293b"/>

                <rect x="20" y="460" width="300" height="12" fill="#1e293b"/>
                <rect x="20" y="480" width="200" height="8" fill="#94a3b8"/>

                <rect x="20" y="520" width="80" height="16" fill="#1e293b"/>

                <g transform="translate(20, 550)">
                    <rect width="70" height="24" rx="12" fill="#2563eb"/>
                    <rect x="80" width="90" height="24" rx="12" fill="#2563eb"/>
                    <rect x="180" width="75" height="24" rx="12" fill="#2563eb"/>
                    <rect x="265" width="85" height="24" rx="12" fill="#2563eb"/>
                </g>
            </svg>
        )
    },
    {
        name: "Two Column",
        id: "classic-two-column",
        svg: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 565">
                <rect width="400" height="565" fill="#ffffff"/>

                <rect width="133" height="565" fill="#e2e8f0"/>

                <circle cx="66" cy="50" r="30" fill="#cbd5e1"/>

                <rect x="20" y="100" width="90" height="16" fill="#1e293b"/>
                <rect x="20" y="125" width="70" height="12" fill="#1e293b" opacity="0.8"/>
                <rect x="20" y="145" width="90" height="8" fill="#64748b"/>
                <rect x="20" y="160" width="90" height="8" fill="#64748b"/>
                <rect x="20" y="175" width="90" height="8" fill="#64748b"/>

                <rect x="20" y="220" width="60" height="14" fill="#1e293b"/>
                <line x1="20" y1="245" x2="113" y2="245" stroke="#2563eb" strokeWidth="2"/>

                <g transform="translate(20, 260)">
                    <rect width="50" height="20" rx="4" fill="#2563eb"/>
                    <rect y="25" width="70" height="20" rx="4" fill="#2563eb"/>
                    <rect y="50" width="60" height="20" rx="4" fill="#2563eb"/>
                    <rect y="75" width="55" height="20" rx="4" fill="#2563eb"/>
                </g>

                <rect x="20" y="380" width="60" height="14" fill="#1e293b"/>
                <line x1="20" y1="415" x2="113" y2="415" stroke="#2563eb" strokeWidth="2"/>

                <g transform="translate(20, 430)">
                    <rect width="50" height="20" rx="4" fill="#2563eb"/>
                    <rect y="25" width="70" height="20" rx="4" fill="#2563eb"/>
                    <rect y="50" width="60" height="20" rx="4" fill="#2563eb"/>
                    <rect y="75" width="55" height="20" rx="4" fill="#2563eb"/>
                </g>

                <rect x="153" y="30" width="120" height="14" fill="#2563eb"/>
                <rect x="153" y="55" width="227" height="8" fill="#64748b"/>
                <rect x="153" y="68" width="227" height="8" fill="#64748b"/>
                <rect x="153" y="81" width="180" height="8" fill="#64748b"/>

                <line x1="153" y1="120" x2="380" y2="120" stroke="#2563eb" strokeWidth="2"/>
                <rect x="153" y="140" width="120" height="14" fill="#2563eb"/>

                <rect x="153" y="170" width="120" height="10" fill="#2563eb"/>
                <rect x="290" y="170" width="90" height="10" fill="#2563eb"/>
                <rect x="153" y="185" width="100" height="8" fill="#64748b"/>
                <rect x="153" y="198" width="227" height="8" fill="#64748b"/>
                <rect x="153" y="211" width="227" height="8" fill="#64748b"/>

                <rect x="153" y="240" width="120" height="10" fill="#2563eb"/>
                <rect x="290" y="240" width="90" height="10" fill="#2563eb"/>
                <rect x="153" y="255" width="100" height="8" fill="#64748b"/>
                <rect x="153" y="268" width="227" height="8" fill="#64748b"/>

                <line x1="153" y1="300" x2="380" y2="300" stroke="#2563eb" strokeWidth="2"/>
                <rect x="153" y="320" width="100" height="14" fill="#2563eb"/>

                <rect x="153" y="350" width="120" height="10" fill="#2563eb"/>
                <rect x="290" y="350" width="90" height="10" fill="#2563eb"/>
                <rect x="153" y="365" width="100" height="8" fill="#64748b"/>
                <rect x="153" y="395" width="100" height="14" fill="#2563eb"/>

                <rect x="153" y="425" width="120" height="10" fill="#2563eb"/>
                <rect x="290" y="425" width="90" height="10" fill="#2563eb"/>
                <rect x="153" y="440" width="100" height="8" fill="#64748b"/>
                <rect x="153" y="470" width="100" height="14" fill="#2563eb"/>

                <rect x="153" y="500" width="120" height="10" fill="#2563eb"/>
                <rect x="290" y="500" width="90" height="10" fill="#2563eb"/>
                <rect x="153" y="515" width="100" height="8" fill="#64748b"/>
            </svg>
        )
    },
];

export default function GeneralInfoForm({
  resumeData,
  setResumeData,
}: EditorFormProps) {
  const form = useForm<GeneralInfoValues>({
    resolver: zodResolver(generalInfoSchema),
    defaultValues: {
      title: resumeData.title || "",
      description: resumeData.description || "",
    },
  });

  const [selectedTemplate, setSelectedTemplate] = useState<string>(resumeData.template || "");

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      setResumeData({ ...resumeData, ...values });
    });
    return unsubscribe;
  }, [form, resumeData, setResumeData]);

  const handleTemplateSelection = (templateId: string) => {
    setSelectedTemplate(templateId);
    setResumeData({ ...resumeData, template: templateId });
  };

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">General info</h2>
        <p className="text-sm text-muted-foreground">
          This will not appear on your resume.
        </p>
      </div>
      <Form {...form}>
        <form className="space-y-3">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="My cool resume" autoFocus />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="A resume for my next job" />
                </FormControl>
                <FormDescription>
                  Describe what this resume is for.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
        <div className="space-y-4">
            <h3 className="text-xl font-semibold text-center">Select a Template</h3>
            <p className="text-sm text-muted-foreground text-center">
                Choose a template for your resume.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {templates.map((template) => (
                    <div
                        key={template.id}
                        className={`relative group cursor-pointer rounded-lg border p-4 shadow-md hover:shadow-lg transition-all ${
                            selectedTemplate === template.id
                                ? "border-primary-500 ring-2 ring-primary-500"
                                : "border-gray-200"
                        }`}
                        onClick={() => handleTemplateSelection(template.id)}
                    >
                        <div className="w-full h-40 flex items-center justify-center my-5">
                            {template.svg}
                        </div>
                        <div className="mt-2 text-center">
                            <h4 className="text-lg font-medium">{template.name}</h4>
                        </div>
                        {selectedTemplate === template.id && (
                            <div className="absolute top-2 right-2 bg-primary-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                Selected
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
}
