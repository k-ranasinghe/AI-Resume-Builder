import { BorderStyles } from "@/app/(main)/editor/BorderStyleButton";
import useDimensions from "@/hooks/useDimensions";
import { cn } from "@/lib/utils";
import { ResumeValues } from "@/lib/validation";
import { formatDate } from "date-fns";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Badge} from "@/components/ui/badge";

interface DefaultPreviewProps {
    resumeData: ResumeValues;
    contentRef?: React.Ref<HTMLDivElement>;
    className?: string;
}

export default function DefaultPreview({
                                           resumeData,
                                           contentRef,
                                           className,
                                       }: DefaultPreviewProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    const { width } = useDimensions(containerRef);

    return (
        <div
            className={cn(
                "aspect-[210/297] h-fit w-full bg-white text-black",
                className,
            )}
            ref={containerRef}
        >
            <div
                className={cn("space-y-6 p-6", !width && "invisible")}
                style={{
                    zoom: (1 / 794) * width,
                }}
                ref={contentRef}
                id="resumePreviewContent"
            >
                <PersonalInfoHeader resumeData={resumeData} />
                <SummarySection resumeData={resumeData} />
                <WorkExperienceSection resumeData={resumeData} />
                <EducationSection resumeData={resumeData} />
                <SkillsSection resumeData={resumeData} />
            </div>
        </div>
    );
}

interface ResumeSectionProps {
    resumeData: ResumeValues;
}

function PersonalInfoHeader({ resumeData }: ResumeSectionProps) {
    const {
        photo,
        firstName,
        lastName,
        jobTitle,
        city,
        country,
        phone,
        email,
    } = resumeData;

    const [photoSrc, setPhotoSrc] = useState(photo instanceof File ? "" : photo);

    useEffect(() => {
        const objectUrl = photo instanceof File ? URL.createObjectURL(photo) : "";
        if (objectUrl) setPhotoSrc(objectUrl);
        if (photo === null) setPhotoSrc("");
        return () => URL.revokeObjectURL(objectUrl);
    }, [photo]);

    return (
        <div className="text-center">
            <h1 className="text-3xl font-bold">{firstName} {lastName}</h1>
            <p className="text-xl">{jobTitle}</p>
            <p className="text-sm text-gray-500">
                {city}, {country} | {phone} | {email}
            </p>
        </div>
    );
}

function SummarySection({ resumeData }: ResumeSectionProps) {
    const { summary } = resumeData;

    if (!summary) return null;

    return (
        <div className="my-4">
            <h2 className="text-xl font-semibold">Professional Summary</h2>
            <p className="text-sm">{summary}</p>
        </div>
    );
}

function WorkExperienceSection({ resumeData }: ResumeSectionProps) {
    const { workExperiences } = resumeData;

    const workExperiencesNotEmpty = workExperiences?.filter(
        (exp) => Object.values(exp).filter(Boolean).length > 0,
    );

    if (!workExperiencesNotEmpty?.length) return null;

    return (
        <div className="my-4">
            <h2 className="text-xl font-semibold">Work Experience</h2>
            {workExperiencesNotEmpty.map((exp, index) => (
                <div key={index} className="my-2">
                    <h3 className="text-sm font-semibold">{exp.position} - {exp.company}</h3>
                    <p className="text-xs text-gray-500">
                        {exp.startDate && (formatDate(exp.startDate, "MMM yyyy"))} - {exp.endDate ? formatDate(exp.endDate, "MMM yyyy") : "Present"}
                    </p>
                    <div className="whitespace-pre-line text-xs">{exp.description}</div>
                </div>
            ))}
        </div>
    );
}

function EducationSection({ resumeData }: ResumeSectionProps) {
    const { educations } = resumeData;

    const educationsNotEmpty = educations?.filter(
        (edu) => Object.values(edu).filter(Boolean).length > 0,
    );

    if (!educationsNotEmpty?.length) return null;

    return (
        <div className="my-4">
            <h2 className="text-xl font-semibold">Education</h2>
            {educationsNotEmpty.map((edu, index) => (
                <div key={index} className="my-2">
                    <h3 className="text-sm font-semibold">{edu.degree} - {edu.school}</h3>
                    <p className="text-xs text-gray-500">
                        {edu.startDate && (formatDate(edu.startDate, "MMM yyyy"))} - {edu.endDate ? formatDate(edu.endDate, "MMM yyyy") : "Present"}
                    </p>
                </div>
            ))}
        </div>
    );
}

function SkillsSection({ resumeData }: ResumeSectionProps) {
    const { skills, colorHex } = resumeData;

    if (!skills?.length) return null;

    return (
        <div className="my-4">
            <h2 className="text-xl font-semibold">Skills</h2>
            <div className="flex gap-2">
                {skills.map((skill, index) => (
                    <Badge key={index} className="text-xs" style={{backgroundColor: colorHex}}>{skill}</Badge>
                ))}
            </div>
        </div>
    );
}
