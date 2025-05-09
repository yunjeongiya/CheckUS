
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import InputWithLabel from "@/components/ui/input-with-label";
import { Check, School } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [schoolOpen, setSchoolOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    role: "student", // student or parent
    gender: "",
    school: "",
    grade: "",
  });
  const [error, setError] = useState("");
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

  const handleRoleChange = (value: string) => {
    setFormData((prev) => ({ ...prev, role: value }));
  };
  
  const handleSchoolSelect = (school: string) => {
    setFormData((prev) => ({ ...prev, school }));
    setSchoolOpen(false);
  };

  const validate = () => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) {
      errors.name = "이름을 입력해주세요";
    }

    if (!formData.username.trim()) {
      errors.username = "아이디를 입력해주세요";
    }

    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = "전화번호를 입력해주세요";
    }

    if (!formData.password) {
      errors.password = "비밀번호를 입력해주세요";
    } else if (formData.password.length < 6) {
      errors.password = "비밀번호는 6자 이상이어야 합니다";
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "비밀번호가 일치하지 않습니다";
    }

    if (formData.role === "student") {
      if (!formData.gender) {
        errors.gender = "성별을 선택해주세요";
      }
      
      if (!formData.school) {
        errors.school = "학교를 입력해주세요";
      }
      
      if (!formData.grade) {
        errors.grade = "학년을 선택해주세요";
      }
    }

    return errors;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors);
      return;
    }

    setFieldErrors({});
    setLoading(true);
    setError("");

    // In a real app, you'd register the user
    // For now, simply simulate a successful registration
    setTimeout(() => {
      setLoading(false);
      navigate("/login");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-accent/20">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary">CheckUS</h1>
          <p className="text-sm text-gray-600 mt-1">학습 관리를 위한 최고의 파트너</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>회원가입</CardTitle>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && (
                <div className="bg-red-50 text-red-500 text-sm p-3 rounded">
                  {error}
                </div>
              )}

              <RadioGroup
                defaultValue="student"
                value={formData.role}
                onValueChange={handleRoleChange}
                className="flex justify-around"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="student" id="student" />
                  <Label htmlFor="student">학생</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="parent" id="parent" />
                  <Label htmlFor="parent">학부모</Label>
                </div>
              </RadioGroup>

              <InputWithLabel
                id="name"
                name="name"
                label="이름"
                placeholder="홍길동"
                value={formData.name}
                onChange={handleChange}
                error={fieldErrors.name}
                required
              />

              <InputWithLabel
                id="username"
                name="username"
                label="아이디"
                placeholder="student_user"
                value={formData.username}
                onChange={handleChange}
                error={fieldErrors.username}
                required
              />

              <InputWithLabel
                id="phoneNumber"
                name="phoneNumber"
                label="전화번호"
                placeholder="010-1234-5678"
                value={formData.phoneNumber}
                onChange={handleChange}
                error={fieldErrors.phoneNumber}
                required
              />

              <InputWithLabel
                id="password"
                name="password"
                label="비밀번호"
                type="password"
                value={formData.password}
                onChange={handleChange}
                error={fieldErrors.password}
                required
              />

              <InputWithLabel
                id="confirmPassword"
                name="confirmPassword"
                label="비밀번호 확인"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={fieldErrors.confirmPassword}
                required
              />

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
                    {fieldErrors.gender && (
                      <p className="text-xs text-red-500">{fieldErrors.gender}</p>
                    )}
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
                    {fieldErrors.school && (
                      <p className="text-xs text-red-500">{fieldErrors.school}</p>
                    )}
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
                    {fieldErrors.grade && (
                      <p className="text-xs text-red-500">{fieldErrors.grade}</p>
                    )}
                  </div>
                </>
              )}
            </CardContent>

            <CardFooter className="flex-col gap-3">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "가입 중..." : "회원가입"}
              </Button>

              <div className="text-sm text-center mt-2">
                이미 계정이 있으신가요?{" "}
                <Link to="/login" className="text-primary font-medium">
                  로그인
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Register;
