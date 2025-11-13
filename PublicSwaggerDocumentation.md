# 🌐 **Public Swagger Documentation - Cornor Academy Course API**

## 🎯 **Public Access URLs (No VPN Required!)**

### **📚 Interactive Swagger Documentation:**
```
https://xenogenetic-casimira-squarishly.ngrok-free.dev/api-docs
```

### **📊 API Information Endpoint:**
```
https://xenogenetic-casimira-squarishly.ngrok-free.dev/
```

### **🔗 Base API URL:**
```
https://xenogenetic-casimira-squarishly.ngrok-free.dev
```

---

## 🚀 **Frontend Developer - Ready to Use!**

### **✅ What You Get:**
- **Public Swagger UI** - Test all 19 APIs online
- **Interactive Documentation** - No local setup needed
- **Real API Testing** - Live backend connection
- **Complete Schema Reference** - TypeScript interfaces ready

### **🔧 API Integration:**
```typescript
// Use this base URL in your frontend
const API_BASE_URL = 'https://xenogenetic-casimira-squarishly.ngrok-free.dev';

// Example API call
const response = await fetch(`${API_BASE_URL}/course`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
});
```

---

## 📋 **Complete Course Management APIs**

### **🎓 Course Management (10 endpoints):**
```
POST   /course                      - Create new course
GET    /course                      - Get all courses
GET    /course/{courseId}           - Get course by ID  
PUT    /course/update/{courseId}    - Update course
DELETE /course/{courseId}           - Delete course
GET    /course/category/{category}  - Filter by category
GET    /course/teacher/{teacherId}  - Filter by teacher
GET    /course/status/{status}      - Filter by status
PATCH  /course/status/{courseId}    - Update course status
GET    /course/search/{query}       - Search courses
```

### **📁 Course Media (5 endpoints):**
```
POST   /course-media                - Upload course media
GET    /course-media/{courseId}     - Get all course media
GET    /course-media/{mediaId}      - Get specific media
PUT    /course-media/{mediaId}      - Update media details
DELETE /course-media/{mediaId}      - Delete media file
```

### **📢 Course Announcements (4 endpoints):**
```
POST   /{teacherId}/courses/{courseId}/announcement  - Create announcement
GET    /course/{courseId}/announcement               - Get announcements
PUT    /course/{announcementId}                      - Update announcement
DELETE /course/{announcementId}                      - Delete announcement
```

---

## 🧪 **Quick Testing Guide**

### **1. Open Swagger UI:**
```
Click: https://xenogenetic-casimira-squarishly.ngrok-free.dev/api-docs
```

### **2. Test Course Creation:**
```json
POST /course - Use this sample data:
{
  "title": "Frontend Integration Test Course",
  "description": "Testing course creation from public Swagger interface",
  "requirements": ["Basic knowledge", "Internet connection"],
  "includes": ["Video tutorials", "Course materials"],
  "whatYouWillLearn": ["API Integration", "Frontend Development"],
  "meetingUrl": "https://zoom.us/j/123456789",
  "meetingTime": "2025-12-01T10:00:00Z",
  "language": "english",
  "level": "beginner",
  "thumbnail": "https://example.com/course-thumb.jpg",
  "category": "WebDevelopment",
  "startDate": "2025-12-01T00:00:00Z",
  "duration": 120,
  "price": 15000,
  "curriculum": [
    {
      "title": "API Integration Module",
      "noOfLesson": 5,
      "duration": 300,
      "content": ["Understanding APIs", "Making requests", "Handling responses"]
    }
  ],
  "teacherId": "550e8400-e29b-41d4-a716-446655440000"
}
```

### **3. Test Course Retrieval:**
```
GET /course - See all courses
GET /course/search/test - Search functionality
```

---

## 💻 **Frontend Implementation**

### **TypeScript Service Example:**
```typescript
// courseService.ts
export class CourseService {
  private static readonly BASE_URL = 'https://xenogenetic-casimira-squarishly.ngrok-free.dev';

  static async getAllCourses(): Promise<Course[]> {
    const response = await fetch(`${this.BASE_URL}/course`);
    if (!response.ok) throw new Error('Failed to fetch courses');
    return response.json();
  }

  static async createCourse(courseData: CreateCourseRequest): Promise<SuccessResponse> {
    const response = await fetch(`${this.BASE_URL}/course`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getAuthToken()}`
      },
      body: JSON.stringify(courseData)
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    
    return response.json();
  }

  static async searchCourses(query: string): Promise<Course[]> {
    const response = await fetch(`${this.BASE_URL}/course/search/${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error('Search failed');
    return response.json();
  }

  private static getAuthToken(): string {
    // Implement your auth logic here
    return localStorage.getItem('authToken') || '';
  }
}
```

### **React Component Example:**
```typescript
// CourseList.tsx
import React, { useEffect, useState } from 'react';
import { CourseService } from './services/courseService';

interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  level: string;
  category: string;
  teacher?: { name: string };
}

export const CourseList: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      setLoading(true);
      const data = await CourseService.getAllCourses();
      setCourses(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading courses...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Available Courses ({courses.length})</h2>
      {courses.map(course => (
        <div key={course.id} className="course-card">
          <h3>{course.title}</h3>
          <p>{course.description}</p>
          <p>Price: NPR {course.price}</p>
          <p>Level: {course.level} | Category: {course.category}</p>
          {course.teacher && <p>Teacher: {course.teacher.name}</p>}
        </div>
      ))}
    </div>
  );
};
```

---

## 🔐 **Authentication Setup**

### **For Protected Endpoints:**
```javascript
// When testing in Swagger UI:
// 1. Click "Authorize" 🔓 button
// 2. Enter: Bearer your-jwt-token-here
// 3. Click "Authorize"
// 4. Test protected endpoints

// In your frontend code:
headers: {
  'Authorization': 'Bearer ' + yourAuthToken,
  'Content-Type': 'application/json'
}
```

---

## 📱 **CORS Notice**

The API is configured to accept requests from any origin, so you can test from:
- Local development (localhost)
- Deployed frontend applications  
- Swagger UI interface
- Postman or similar tools

---

## 🎯 **Development Workflow**

### **Step 1: Explore APIs**
```
Visit: https://xenogenetic-casimira-squarishly.ngrok-free.dev/api-docs
Test each endpoint to understand structure
```

### **Step 2: Copy Schemas**
```
Expand "Schemas" section in Swagger
Copy TypeScript interfaces for your project
```

### **Step 3: Implement Services**
```
Create API service layer using provided examples
Handle authentication and error cases
```

### **Step 4: Build Components**
```
Create forms and lists using the API services
Test with real data from the public API
```

---

## 🚨 **Important Notes**

### **⚠️ Database Status:**
- Backend server is running ✅
- Database is not connected ⚠️  
- APIs return appropriate error messages
- Swagger documentation works perfectly
- Use for structure understanding and initial development

### **🔄 Ngrok Session:**
- This URL is active as long as ngrok is running
- URL may change if ngrok is restarted
- For permanent testing, set up proper hosting

### **📞 Support:**
- Test endpoints in Swagger UI first
- Report any API issues to backend team
- Use provided TypeScript interfaces for type safety

---

## 🎉 **Ready for Integration!**

**✅ 19 APIs documented and accessible**  
**✅ Interactive testing interface**  
**✅ TypeScript schemas provided**  
**✅ Code examples included**  
**✅ Public access - no VPN needed**  

**🔗 Start Here: https://xenogenetic-casimira-squarishly.ngrok-free.dev/api-docs**

---

*Generated on: November 13, 2025*  
*Public URL: Active via Ngrok Tunnel*  
*Status: ✅ Ready for Frontend Integration*