import { http, HttpResponse } from "msw";

export const handlers = [
    http.get('http://localhost:3000/tasks', () => {
        return HttpResponse.json([
            {
                id: "1",
                title: "task 1",
                dueDate: "2025-05-09",
                completed: false,
            }
        ], { status: 200 })
    }),
    http.get('http://localhost:3000/tasks/1', () => {
        return HttpResponse.json([
            {
                id: "1",
                title: "task 1",
                dueDate: "2025-05-09",
                completed: false,
            }
        ], { status: 200 })
    }),
    http.post('http://localhost:3000/tasks', () => {
        return HttpResponse.json(null, { status: 200 })
    }),
    http.put('http://localhost:3000/tasks/1', () => {
        return HttpResponse.json([
            {
                id: "1",
                title: "task 1 updated",
                dueDate: "2025-05-09",
                completed: false,
            }
        ], { status: 200 })
    }),
    http.delete('http://localhost:3000/tasks', () => {
        return HttpResponse.json({}, { status: 200 })
    }),
    http.get('http://localhost:3000/users/1', () => {
        return HttpResponse.json(
            {
                id: "1",
                username: "test-user",
                email: "mail@mail.com",
                password: "123",
            }
            , { status: 200 })
    }),
    http.get('http://localhost:3000/users?email=mail@mail.com&password=123', () => {
        return HttpResponse.json(
            {
                id: "1",
                username: "test-user",
                email: "mail@mail.com",
                password: "123",
            }
            , { status: 200 })
    }),
    http.post('http://localhost:3000/users', async () => {
        return await HttpResponse.json(
            {
                id: "1",
                username: "test-user",
                email: "mail@mail.com",
                password: "123",
            }
            , { status: 201 })
    }),
]