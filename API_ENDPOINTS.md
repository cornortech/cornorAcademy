# Course Management System - API Documentation

## Base URL
```
http://localhost:your-port
```

## Course Management APIs

### 1. Create a New Course
- **Method:** POST
- **Endpoint:** `/course`
- **Body (JSON):**
```json
{
  "title": "Full Stack Web Development",
  "description": "Complete web development course covering frontend and backend technologies",
  "requirements": ["Basic HTML knowledge", "Computer with internet"],
  "includes": ["Video lectures", "Source code", "Certificate"],
  "whatYouWillLearn": ["React", "Node.js", "MongoDB", "REST APIs"],
  "meetingUrl": "https://meet.google.com/xyz",
  "meetingTime": "2024-01-15T10:00:00Z",
  "language": "english",
  "level": "intermediate",
  "thumbnail": "https://example.com/thumbnail.jpg",
  "category": "WebDevelopment",
  "startDate": "2024-01-15T00:00:00Z",
  "duration": 12,
  "price": 25000,
  "curriculum": [
    {
      "title": "HTML & CSS Basics",
      "noOfLesson": 10,
      "duration": 20,
      "content": ["HTML structure", "CSS styling", "Responsive design"]
    }
  ],
  "teacherId": "teacher-uuid-here"
}
```

### 2. Get All Courses
- **Method:** GET
- **Endpoint:** `/course`
- **Response:** Array of course objects

### 3. Get Specific Course by ID
- **Method:** GET
- **Endpoint:** `/course/{courseId}`
- **Example:** `/course/550e8400-e29b-41d4-a716-446655440000`

### 4. Update an Existing Course
- **Method:** PUT
- **Endpoint:** `/course/update/{courseId}`
- **Body (JSON):** Same as create course (all fields optional)

### 5. Delete a Course
- **Method:** DELETE
- **Endpoint:** `/course/{courseId}`

### 6. Get Courses by Category
- **Method:** GET
- **Endpoint:** `/course/category/{category}`
- **Categories:** `WebDevelopment`, `ui`, `DataScience`, `DigitalMarketing`
- **Example:** `/course/category/WebDevelopment`

### 7. Get All Courses by a Specific Teacher
- **Method:** GET
- **Endpoint:** `/course/teacher/{teacherId}`
- **Example:** `/course/teacher/550e8400-e29b-41d4-a716-446655440000`

### 8. Get Courses by Status
- **Method:** GET
- **Endpoint:** `/course/status/{status}`
- **Status Values:** `upcoming`, `active`, `completed`
- **Example:** `/course/status/active`

### 9. Update Course Status
- **Method:** PATCH
- **Endpoint:** `/course/status/{courseId}`
- **Body (JSON):**
```json
{
  "status": "active"
}
```

### 10. Search Courses
- **Method:** GET
- **Endpoint:** `/course/search/{query}`
- **Example:** `/course/search/javascript`
- **Note:** Searches in title, description, and category

## Course Media APIs

### 1. Upload Media to a Course
- **Method:** POST
- **Endpoint:** `/course-media`
- **Body (JSON):**
```json
{
  "courseId": "course-uuid-here",
  "title": "Introduction Video",
  "description": "Course introduction and overview",
  "duration": 600,
  "pathURL": "https://example.com/video.mp4",
  "size": 104857600,
  "type": "mp4"
}
```

### 2. Get All Media for a Course
- **Method:** GET
- **Endpoint:** `/course-media/{courseId}`
- **Example:** `/course-media/550e8400-e29b-41d4-a716-446655440000`

### 3. Get Specific Media Details
- **Method:** GET
- **Endpoint:** `/course-media/media/{mediaId}`
- **Example:** `/course-media/media/550e8400-e29b-41d4-a716-446655440000`

### 4. Update Course Media
- **Method:** PUT
- **Endpoint:** `/course-media/{mediaId}`
- **Body (JSON):** Same as create media (all fields optional)

### 5. Delete Course Media
- **Method:** DELETE
- **Endpoint:** `/course-media/{mediaId}`

## Course Announcement APIs

### 1. Create Course Announcement
- **Method:** POST
- **Endpoint:** `/{teacherId}/courses/{courseId}/announcement`
- **Example:** `/550e8400-e29b-41d4-a716-446655440000/courses/550e8400-e29b-41d4-a716-446655440001/announcement`
- **Body (JSON):**
```json
{
  "title": "Class Postponed",
  "message": "Tomorrow's class has been postponed due to technical issues. New schedule will be announced soon."
}
```

### 2. Get All Announcements for a Course
- **Method:** GET
- **Endpoint:** `/course/{courseId}/announcement`
- **Example:** `/course/550e8400-e29b-41d4-a716-446655440000/announcement`

### 3. Update an Announcement
- **Method:** PUT
- **Endpoint:** `/course/{announcementId}`
- **Body (JSON):**
```json
{
  "title": "Updated: Class Rescheduled",
  "message": "The class has been rescheduled to next Monday at 10 AM."
}
```

### 4. Delete an Announcement
- **Method:** DELETE
- **Endpoint:** `/course/{announcementId}`

## Media Types Supported
- `pdf`, `video`, `img`, `code`, `docx`, `xlsx`, `txt`, `jpg`, `png`, `mp3`, `mp4`, `zip`, `exe`, `other`

## Course Categories
- `WebDevelopment`, `ui`, `DataScience`, `DigitalMarketing`

## Course Levels
- `beginner`, `intermediate`, `advanced`

## Course Status
- `upcoming`, `active`, `completed`

## Languages
- `nepali`, `english`

## Error Responses
All endpoints return appropriate HTTP status codes:
- `200` - Success
- `201` - Created successfully
- `400` - Bad request (validation error)
- `404` - Resource not found
- `500` - Internal server error

Example error response:
```json
{
  "success": false,
  "error": "Course not found"
}
```

## Success Responses
Example success response:
```json
{
  "success": true,
  "message": "Course created successfully"
}
```

## Testing Notes for Postman

1. **UUIDs:** Make sure to use valid UUIDs for all ID parameters
2. **Date Format:** Use ISO 8601 format for dates (e.g., "2024-01-15T10:00:00Z")
3. **Content-Type:** Set to "application/json" for all POST/PUT/PATCH requests
4. **Validation:** All required fields must be provided as per the schemas
5. **Dependencies:** Create courses and teachers first before creating media or announcements
6. **Search:** URL encode special characters in search queries

## Production Considerations

- All endpoints include proper error handling
- Database constraints are enforced (foreign keys, required fields)
- Input validation using Zod schemas
- Proper HTTP status codes returned
- SQL injection protection via Prisma ORM
- Transaction handling for complex operations