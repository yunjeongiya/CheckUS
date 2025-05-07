
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Mock data for student list - in a real app, this would come from API
const mockStudents = [
  {
    id: "1",
    name: "김학생",
    grade: "2",
    school: "OO중학교",
    relationshipType: "자녀"
  },
  {
    id: "2",
    name: "이학생",
    grade: "3",
    school: "창덕여자중학교",
    relationshipType: "자녀"
  },
  {
    id: "3",
    name: "박학생", 
    grade: "1",
    school: "상봉중학교",
    relationshipType: "조카"
  }
];

const StudentSelection = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);

  const handleStudentSelect = (studentId: string) => {
    setSelectedStudentId(studentId);
  };

  const handleContinue = () => {
    if (!selectedStudentId) {
      toast({
        title: "학생을 선택해주세요",
        description: "관리할 학생을 선택한 후 계속해주세요.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, you would store the selected student in context or state
    // For now, we'll just navigate to the dashboard
    toast({
      title: "학생 선택 완료",
      description: "선택한 학생의 정보를 볼 수 있습니다.",
    });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container max-w-md mx-auto p-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">학생 선택</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-500">
              관리하실 학생을 선택해주세요.
            </p>
            
            <div className="space-y-2">
              {mockStudents.map((student) => (
                <div
                  key={student.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedStudentId === student.id
                      ? "border-primary bg-primary/10"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                  onClick={() => handleStudentSelect(student.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-accent rounded-full p-2">
                      <User className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-gray-500">
                        {student.school} {student.grade}학년 ({student.relationshipType})
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Button onClick={handleContinue} className="w-full mt-4">
              계속하기
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentSelection;
