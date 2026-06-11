"use client";

import { useState, useEffect } from "react";
import {
  useGetAllCourses,
  useCreateCourse,
  useDeleteCourse,
  useSearchCourses,
  CreateCourseInput,
} from "@/api/course";
import { Course } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function CourseManager() {
  const [searchQuery, setSearchQuery] = useState("");

  const allCoursesQuery = useGetAllCourses();
  const searchCoursesQuery = useSearchCourses(searchQuery);

  const courses = searchQuery
    ? searchCoursesQuery.data || []
    : allCoursesQuery.data || [];
  const loading = searchQuery
    ? searchCoursesQuery.isLoading
    : allCoursesQuery.isLoading;
  const refetch = searchQuery
    ? searchCoursesQuery.refetch
    : allCoursesQuery.refetch;

  const { mutateAsync: createCourseMutation } = useCreateCourse();
  const { mutateAsync: deleteCourseMutation } = useDeleteCourse();

  const [error, setError] = useState<string | null>(null);

  // Form state for creating new course
  const [newCourse, setNewCourse] = useState<Partial<CreateCourseInput>>({
    title: "",
    description: "",
    requirements: [],
    includes: [],
    whatYouWillLearn: [],
    meetingUrl: "",
    meetingTime: new Date(),
    language: "english",
    level: "beginner",
    thumbnail: "",
    category: "WebDevelopment",
    startDate: new Date(),
    duration: 12,
    price: 299,
    curriculum: [],
    teacherId: "",
  });

  // Create new course
  const createCourse = async () => {
    if (!newCourse.title || !newCourse.description || !newCourse.teacherId) {
      setError("Please fill in all required fields");
      return;
    }

    setError(null);
    try {
      await createCourseMutation(newCourse as CreateCourseInput);
      // Reset form
      setNewCourse({
        title: "",
        description: "",
        requirements: [],
        includes: [],
        whatYouWillLearn: [],
        meetingUrl: "",
        meetingTime: new Date(),
        language: "english",
        level: "beginner",
        thumbnail: "",
        category: "WebDevelopment",
        startDate: new Date(),
        duration: 12,
        price: 299,
        curriculum: [],
        teacherId: "",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create course");
    }
  };



  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Course Management</h1>
        <Button onClick={() => refetch()} disabled={loading}>
          Refresh Courses
        </Button>
      </div>

      {/* Search */}
      <div className="flex gap-4">
        <Input
          placeholder="Search courses..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
        />
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Create New Course Form */}
      <div className="bg-white p-6 rounded-lg border">
        <h2 className="text-xl font-semibold mb-4">Create New Course</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            placeholder="Course Title"
            value={newCourse.title || ""}
            onChange={(e) =>
              setNewCourse({ ...newCourse, title: e.target.value })
            }
          />
          <Input
            placeholder="Teacher ID"
            value={newCourse.teacherId || ""}
            onChange={(e) =>
              setNewCourse({ ...newCourse, teacherId: e.target.value })
            }
          />
          <Input
            placeholder="Thumbnail URL"
            value={newCourse.thumbnail || ""}
            onChange={(e) =>
              setNewCourse({ ...newCourse, thumbnail: e.target.value })
            }
          />
          <Input
            placeholder="Meeting URL"
            value={newCourse.meetingUrl || ""}
            onChange={(e) =>
              setNewCourse({ ...newCourse, meetingUrl: e.target.value })
            }
          />
          <Input
            placeholder="Price"
            type="number"
            value={newCourse.price?.toString() || ""}
            onChange={(e) =>
              setNewCourse({ ...newCourse, price: parseInt(e.target.value) })
            }
          />
          <Input
            placeholder="Duration (weeks)"
            type="number"
            value={newCourse.duration?.toString() || ""}
            onChange={(e) =>
              setNewCourse({ ...newCourse, duration: parseInt(e.target.value) })
            }
          />
          <Select
            value={newCourse.category}
            onValueChange={(value: any) =>
              setNewCourse({ ...newCourse, category: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="WebDevelopment">Web Development</SelectItem>
              <SelectItem value="ui">UI/UX</SelectItem>
              <SelectItem value="DataScience">Data Science</SelectItem>
              <SelectItem value="DigitalMarketing">
                Digital Marketing
              </SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={newCourse.level}
            onValueChange={(value: any) =>
              setNewCourse({ ...newCourse, level: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Textarea
          placeholder="Course Description"
          value={newCourse.description || ""}
          onChange={(e) =>
            setNewCourse({ ...newCourse, description: e.target.value })
          }
          className="mt-4"
          rows={3}
        />
        <Button onClick={createCourse} disabled={loading} className="mt-4">
          Create Course
        </Button>
      </div>

      {/* Courses List */}
      <div className="bg-white p-6 rounded-lg border">
        <h2 className="text-xl font-semibold mb-4">All Courses</h2>
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : courses.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No courses found</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.map((course) => (
              <div key={course.id} className="border rounded-lg p-4 space-y-2">
                <h3 className="font-semibold">{course.title}</h3>
                <p className="text-sm text-gray-600">{course.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {course.category}
                  </span>
                  <span className="font-semibold">Rs {course.price}</span>
                </div>
                <div className="flex gap-2 mt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      // TODO: Implement view course details
                      console.log("View course", course.id);
                    }}
                  >
                    View
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={async () => {
                      try {
                        await deleteCourseMutation(course.id);
                        refetch();
                      } catch (err) {
                        setError(
                          err instanceof Error ? err.message : "Delete failed"
                        );
                      }
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
