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
                className={cn("flex justify-between", !width && "invisible")}
                style={{
                    zoom: (1 / 794) * width,
                }}
                ref={contentRef}
                id="resumePreviewContent"
            >
                <div className="w-1/3 min-h-max space-y-6 p-4 bg-gray-200">
                    <PersonalInfoHeader resumeData={resumeData} />
                    <SkillsSection resumeData={resumeData} />
                </div>
                <div className="w-2/3 space-y-6 p-4">
                    <SummarySection resumeData={resumeData} />
                    <WorkExperienceSection resumeData={resumeData} />
                    <EducationSection resumeData={resumeData} />
                </div>
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
        colorHex,
        borderStyle,
    } = resumeData;

    const [photoSrc, setPhotoSrc] = useState(photo instanceof File ? "" : photo);

    useEffect(() => {
        const objectUrl = photo instanceof File ? URL.createObjectURL(photo) : "";
        if (objectUrl) setPhotoSrc(objectUrl);
        if (photo === null) setPhotoSrc("");
        return () => URL.revokeObjectURL(objectUrl);
    }, [photo]);

    return (
        <div>
            {photoSrc && (
                <Image
                    src={photoSrc}
                    width={100}
                    height={100}
                    alt="Author photo"
                    className="aspect-square object-cover"
                    style={{
                        borderRadius:
                            borderStyle === BorderStyles.SQUARE
                                ? "0px"
                                : borderStyle === BorderStyles.CIRCLE
                                    ? "9999px"
                                    : "10%",
                    }}
                />
            )}
            <h1 className="text-3xl font-bold"style={{ color: colorHex }}>{firstName} {lastName}</h1>
            <p className="text-lg">{jobTitle}</p>
            <p className="text-sm text-gray-500">{city}, {country}</p>
            <p className="text-sm text-gray-500">{phone}</p>
            <p className="text-sm text-gray-500">{email}</p>
        </div>
    );
}

function SummarySection({ resumeData }: ResumeSectionProps) {
    const { summary, colorHex } = resumeData;

    if (!summary) return null;

    return (
        <div className="break-inside-avoid space-y-3">
            <p
                className="text-lg font-semibold"
                style={{
                    color: colorHex,
                }}
            >
                Professional profile
            </p>
            <div className="whitespace-pre-line text-sm">{summary}</div>
        </div>
    );
}

function WorkExperienceSection({ resumeData }: ResumeSectionProps) {
    const { workExperiences, colorHex } = resumeData;

    const workExperiencesNotEmpty = workExperiences?.filter(
        (exp) => Object.values(exp).filter(Boolean).length > 0,
    );

    if (!workExperiencesNotEmpty?.length) return null;

    return (
        <>
            <hr
                className="border-2"
                style={{
                    borderColor: colorHex,
                }}
            />
            <div className="space-y-3">
                <p
                    className="text-lg font-semibold"
                    style={{
                        color: colorHex,
                    }}
                >
                    Work experience
                </p>
                {workExperiencesNotEmpty.map((exp, index) => (
                    <div key={index} className="break-inside-avoid space-y-1">
                        <div
                            className="flex items-center justify-between text-sm font-semibold"
                            style={{
                                color: colorHex,
                            }}
                        >
                            <span>{exp.position}</span>
                            {exp.startDate && (
                                <span>
                  {formatDate(exp.startDate, "MMM yyyy")} -{" "}
                                    {exp.endDate ? formatDate(exp.endDate, "MMM yyyy") : "Present"}
                </span>
                            )}
                        </div>
                        <p className="text-xs font-semibold">{exp.company}</p>
                        <div className="whitespace-pre-line text-xs">{exp.description}</div>
                    </div>
                ))}
            </div>
        </>
    );
}

function EducationSection({ resumeData }: ResumeSectionProps) {
    const { educations, colorHex } = resumeData;

    const educationsNotEmpty = educations?.filter(
        (edu) => Object.values(edu).filter(Boolean).length > 0,
    );

    if (!educationsNotEmpty?.length) return null;

    return (
        <>
            <hr
                className="border-2"
                style={{
                    borderColor: colorHex,
                }}
            />
            <div className="space-y-3">
                <p
                    className="text-lg font-semibold"
                    style={{
                        color: colorHex,
                    }}
                >
                    Education
                </p>
                {educationsNotEmpty.map((edu, index) => (
                    <div key={index} className="break-inside-avoid space-y-1">
                        <div
                            className="flex items-center justify-between text-sm font-semibold"
                            style={{
                                color: colorHex,
                            }}
                        >
                            <span>{edu.degree}</span>
                            {edu.startDate && (
                                <span>
                  {formatDate(edu.startDate, "MMM yyyy")} -{" "}
                                    {edu.endDate ? formatDate(edu.endDate, "MMM yyyy") : "Present"}
                </span>
                            )}
                        </div>
                        <p className="text-xs font-semibold">{edu.school}</p>
                    </div>
                ))}
            </div>
        </>
    );
}

function SkillsSection({ resumeData }: ResumeSectionProps) {
    const { skills, colorHex, borderStyle } = resumeData;

    if (!skills?.length) return null;

    return (
        <>
            <hr
                className="border-2"
                style={{
                    borderColor: colorHex,
                }}
            />
            <div className="break-inside-avoid space-y-3">
                <p
                    className="text-lg font-semibold"
                    style={{
                        color: colorHex,
                    }}
                >
                    Skills
                </p>
                <div className="flex break-inside-avoid flex-wrap gap-2">
                    {skills.map((skill, index) => (
                        <Badge
                            key={index}
                            className="rounded-md bg-black text-white hover:bg-black"
                            style={{
                                backgroundColor: colorHex,
                                borderRadius:
                                    borderStyle === BorderStyles.SQUARE
                                        ? "0px"
                                        : borderStyle === BorderStyles.CIRCLE
                                            ? "9999px"
                                            : "8px",
                            }}
                        >
                            {skill}
                        </Badge>
                    ))}
                </div>
            </div>
        </>
    );
}
