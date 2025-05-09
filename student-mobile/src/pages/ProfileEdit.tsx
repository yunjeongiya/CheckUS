
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import InputWithLabel from "@/components/ui/input-with-label";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, School } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

const ProfileEdit = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [schoolOpen, setSchoolOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "홍길동",
    username: "student_user",
    phoneNumber: "010-1234-5678",
    role: "student",
    gender: "MALE",
    school: "OO중학교",
    grade: "2",
  });
  
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // Example school list - in a real app, this would come from an API
  const schools = [
    "OO중학교",
    "창덕여자중학교",
    "상봉중학교",
    "선덕중학교",
    "신답중학교",
    "용곡중학교",
    "중화중학교",
    "휘경중학교"
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSchoolSelect = (school: string) => {
    setFormData((prev) => ({ ...prev, school }));
    setSchoolOpen(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    // In a real app, you'd send the form data to an API
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "프로필이 업데이트 되었습니다",
        description: "변경사항이 저장되었습니다.",
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container max-w-md mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">프로필 정보</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>내 정보 수정</CardTitle>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <InputWithLabel
                id="name"
                name="name"
                label="이름"
                placeholder="홍길동"
                value={formData.name}
                onChange={handleChange}
                error={fieldErrors.name}
              />

              <InputWithLabel
                id="username"
                name="username"
                label="아이디"
                value={formData.username}
                onChange={handleChange}
                error={fieldErrors.username}
                disabled
              />

              <InputWithLabel
                id="phoneNumber"
                name="phoneNumber"
                label="전화번호"
                placeholder="010-1234-5678"
                value={formData.phoneNumber}
                onChange={handleChange}
                error={fieldErrors.phoneNumber}
              />
              
              <div className="space-y-2">
                <Label htmlFor="role">역할</Label>
                <div className="bg-gray-100 p-2 rounded-md text-gray-700">
                  {formData.role === "student" ? "학생" : "학부모"}
                </div>
              </div>

              {formData.role === "student" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="gender">성별</Label>
                    <Select 
                      value={formData.gender} 
                      onValueChange={(value) => handleSelectChange("gender", value)}
                    >
                      <SelectTrigger id="gender">
                        <SelectValue placeholder="성별 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MALE">남자</SelectItem>
                        <SelectItem value="FEMALE">여자</SelectItem>
                        <SelectItem value="OTHER">기타</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="school">학교</Label>
                    <Popover open={schoolOpen} onOpenChange={setSchoolOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={schoolOpen}
                          className="w-full justify-between"
                        >
                          {formData.school || "학교 검색"}
                          <School className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput placeholder="학교 검색..." />
                          <CommandEmpty>검색 결과가 없습니다</CommandEmpty>
                          <CommandGroup>
                            <CommandList>
                              {schools.map((school) => (
                                <CommandItem
                                  key={school}
                                  value={school}
                                  onSelect={() => handleSchoolSelect(school)}
                                >
                                  {school}
                                  <Check
                                    className={cn(
                                      "ml-auto h-4 w-4",
                                      formData.school === school ? "opacity-100" : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandList>
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="grade">학년</Label>
                    <Select 
                      value={formData.grade} 
                      onValueChange={(value) => handleSelectChange("grade", value)}
                    >
                      <SelectTrigger id="grade">
                        <SelectValue placeholder="학년 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1학년</SelectItem>
                        <SelectItem value="2">2학년</SelectItem>
                        <SelectItem value="3">3학년</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
            </CardContent>

            <CardFooter className="flex-col gap-3">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "저장 중..." : "저장하기"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ProfileEdit;
