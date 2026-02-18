/* eslint-disable @typescript-eslint/no-explicit-any */

// ** Types
import {IOtruyenListComic} from "@/types/api.otruyen";

// =============================== Mocks =============================//
jest.mock("next/cache", () => ({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    unstable_cache: (fn: Function) => fn,
}));

jest.mock("@/lib/fetcher");
jest.mock("@/configs/api-otruyen", () => ({
    CONFIG_API_OTRUYEN: {
        HOME: "https://api.example.com/home",
    },
}));
jest.mock("@/configs/tag-otruyen", () => ({
    CONFIG_TAG_OTRUYEN: {
        HOME: "home-tag",
    },
}));

import { fetcher } from "@/lib/fetcher";
import { getListHome } from "@/services/api-otruyen/home";

const mockedFetcher = fetcher as jest.MockedFunction<typeof fetcher>;

const mockComicList: IOtruyenListComic[] = [
    {
        _id: "1",
        name: "One Piece",
        slug: "one-piece",
        origin_name: ["ワンピース"],
        status: "ongoing",
        thumb_url: "https://img.example.com/one-piece.jpg",
        sub_docquyen: false,
        category: [
            { _id: "cat1", name: "Action", slug: "action" },
            { _id: "cat2", name: "Adventure", slug: "adventure" },
        ],
        updatedAt: "2024-01-01T00:00:00.000Z",
        chaptersLatest: [
            {
                filename: "chapter-1100",
                chapter_name: "1100",
                chapter_title: "Tiêu đề chương",
                chapter_api_data: "https://api.example.com/chapter/1100",
            },
        ],
    },
    {
        _id: "2",
        name: "Naruto",
        slug: "naruto",
        origin_name: ["NARUTO -ナルト-"],
        status: "completed",
        thumb_url: "https://img.example.com/naruto.jpg",
        sub_docquyen: true,
        category: [
            { _id: "cat1", name: "Action", slug: "action" },
        ],
        updatedAt: "2024-01-02T00:00:00.000Z",
        chaptersLatest: [],
    },
];

const mockResponse = {
    status: true,
    message: "success",
    data: {
        items: mockComicList,
    },
    params: {
        pagination: {
            totalItems: 1,
            totalPages: 1,
            currentPage: 1,
        },
    },
};

// ============================== Tests =============================//
describe("getListHome", () => {

    it("should call fetcher with CONFIG_API_OTRUYEN.HOME", async () => {
        mockedFetcher.mockResolvedValueOnce(mockResponse as any);

        await getListHome();

        expect(mockedFetcher).toHaveBeenCalledTimes(1);
        expect(mockedFetcher).toHaveBeenCalledWith("https://api.example.com/home");
    });

    it("should return correct data with valid IOtruyenListComic shape", async () => {
        mockedFetcher.mockResolvedValueOnce(mockResponse as any);

        const result = await getListHome();

        expect(result?.data?.items).toHaveLength(2);

        const firstItem = result?.data?.items[0];
        expect(firstItem).toMatchObject({
            _id: "1",
            name: "One Piece",
            slug: "one-piece",
            status: "ongoing",
            sub_docquyen: false,
        });
        expect(firstItem?.origin_name).toBeInstanceOf(Array);
        expect(firstItem?.category).toHaveLength(2);
        expect(firstItem?.chaptersLatest).toHaveLength(1);
    });

    it("should handle comic with completed status", async () => {
        mockedFetcher.mockResolvedValueOnce(mockResponse as any);

        const result = await getListHome();
        const secondItem = result?.data?.items[1];

        expect(secondItem?.status).toBe("completed");
        expect(secondItem?.chaptersLatest).toHaveLength(0);
        expect(secondItem?.sub_docquyen).toBe(true);
    });

    it("should return empty items when API returns no comics", async () => {
        const emptyResponse = {
            ...mockResponse,
            data: {
                items: [],
                params: {
                    pagination: { totalItems: 0, totalPages: 0, currentPage: 1 },
                },
            },
        };

        mockedFetcher.mockResolvedValueOnce(emptyResponse as any);

        const result = await getListHome();

        expect(result?.data?.items).toHaveLength(0);
    });

    it("should throw when fetcher rejects", async () => {
        mockedFetcher.mockRejectedValueOnce(new Error("Network error"));

        await expect(getListHome()).rejects.toThrow("Network error");
    });
});