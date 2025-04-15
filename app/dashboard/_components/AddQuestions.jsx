"use client";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LoaderCircle } from "lucide-react";
import { chatSession } from "@/utils/GeminiAIModal";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/utils/db";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { Question } from "@/utils/schema";
import { useRouter } from "next/navigation";

const AddQuestions = () => {
  const [openDailog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [typeQuestion, setTypeQuestion] = useState("");
  const [company, setCompany] = useState("");
  const [jobExperience, setJobExperience] = useState();
  const [loading, setLoading] = useState(false);
  const [questionJsonResponse, setQuestionJsonResponse] = useState([]);
  const { user } = useUser();
  const router = useRouter();
  const handleInputChange = (setState) => (e) => {
    setState(e.target.value);
  };

  useEffect(() => {
    switch (jobPosition) {
      case "Full stack Developer":
        setJobDesc("React, Angular, Nodejs, Mysql, Nosql, Python");
        break;
      case "Frontend Developer":
        setJobDesc("React, Angular, Vue, HTML, CSS, JavaScript");
        break;
      case "Backend Developer":
        setJobDesc("Nodejs, Django, Flask, PostgreSQL, MongoDB, Redis");
        break;
      case "DevOps Engineer":
        setJobDesc("AWS, Docker, Kubernetes, Terraform, Jenkins");
        break;
      case "Software Testing and Quality Assurance":
        setJobDesc("Selenium, JUnit, TestNG, Postman, JIRA");
        break;
      default:
        setJobDesc("");
    }
  }, [jobPosition]);

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(jobPosition, jobDesc, jobExperience);

    const InputPrompt = `
  Job Positions: ${jobPosition}, 
  Job Description: ${jobDesc}, 
  Years of Experience: ${jobExperience}. 
  Based on this information, please provide 5 interview questions with answers in JSON format, ensuring "Question" and "Answer" are fields in the JSON.
`;

    const result = await chatSession.sendMessage(InputPrompt);
    const MockJsonResp = result.response
      .text()
      .replace("```json", "")
      .replace("```", "")
      .trim();
    console.log(JSON.parse(MockJsonResp));
    // const parsedResp = MockJsonResp
    setQuestionJsonResponse(MockJsonResp);

    if (MockJsonResp) {
      const resp = await db
        .insert(Question)
        .values({
          questionId: uuidv4(),
          MockQuestionJsonResp: MockJsonResp,
          jobPosition: jobPosition,
          jobDesc: jobDesc,
          jobExperience: jobExperience,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format("YYYY-MM-DD"),
        })
        .returning({ questionId: Question.questionId });

      console.log("Inserted ID:", resp);

      if (resp) {
        setOpenDialog(false);
        router.push("/dashboard/questions/" + resp[0]?.questionId);
      }
    } else {
      console.log("ERROR");
    }
    setLoading(false);
  };

  return (
    <div>
      <div
        className="p-8 rounded-lg border bg-gray-300 hover:scale-105 hover:shadow-sm transition-all cursor-pointer"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className=" text-lg text-center">+ Add New</h2>
      </div>
      <Dialog open={openDailog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl">
              Tell us more about your job interviwing
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
                <div className="my-3">
                  <h2>
                    Add Details about your job position, job descritpion and
                    years of experience
                  </h2>

                  <div className="mt-7 my-3">
                    <label className="text-black">Job Role/job Position</label>
                    <select
                      className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={jobPosition}
                      required
                      onChange={(e) => setJobPosition(e.target.value)}
                    >
                      <option value="" disabled>Select Job Position</option>
                      <option value="Full stack Developer">Full stack Developer</option>
                      <option value="Frontend Developer">Frontend Developer</option>
                      <option value="Backend Developer">Backend Developer</option>
                      <option value="DevOps Engineer">DevOps Engineer</option>
                      <option value="Software Testing and Quality Assurance">Software Testing and Quality Assurance</option>
                    </select>
                  </div>
                  <div className="my-5">
                    <label className="text-black">
                      Job Description/ Tech stack (In Short)
                    </label>
                    <select
                      className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={jobDesc}
                      required
                      onChange={(e) => setJobDesc(e.target.value)}
                      disabled
                    >
                      <option value="" disabled>Select Tech Stack</option>
                      <option value="React, Angular, Nodejs, Mysql, Nosql, Python">React, Angular, Nodejs, Mysql, Nosql, Python</option>
                      <option value="React, Angular, Vue, HTML, CSS, JavaScript">React, Angular, Vue, HTML, CSS, JavaScript</option>
                      <option value="Nodejs, Django, Flask, PostgreSQL, MongoDB, Redis">Nodejs, Django, Flask, PostgreSQL, MongoDB, Redis</option>
                      <option value="AWS, Docker, Kubernetes, Terraform, Jenkins">AWS, Docker, Kubernetes, Terraform, Jenkins</option>
                      <option value="Selenium, JUnit, TestNG, Postman, JIRA">Selenium, JUnit, TestNG, Postman, JIRA</option>
                    </select>
                  </div>
                  <div className="my-5">
                    <label className="text-black">Years of Experience</label>
                    <Input
                      className="mt-1"
                      placeholder="Ex. 5"
                      max="50"
                      type="number"
                      required
                      onChange={(e) => setJobExperience(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex gap-5 justify-end">
                  <Button
                    type="button"
                    variant="goast"
                    onClick={() => setOpenDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <LoaderCircle className="animate-spin" />
                        Generating From AI
                      </>
                    ) : (
                      "Start Interview"
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddQuestions;
