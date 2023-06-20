import axios from "axios";

describe("fetchData", () => {
    const mockData = { id: 1, name: "John Doe" };
    beforeEach(() => {
        jest.resetAllMocks();
    });
    it("should fetch data from a given URL", async () => {
        jest.spyOn(axios, "get").mockResolvedValueOnce({ data: mockData });
        const url = "https://example.com/api/data";
        const response = await axios.get(url);
        expect(response.data).toEqual(mockData);
        expect(axios.get).toHaveBeenCalledWith(url);
    });
    it("should handle network errors", async () => {
        const errorMessage = "Network error";
        jest.spyOn(axios, "get").mockRejectedValueOnce(new Error(errorMessage));
        const url = "https://example.com/api/data";
        await expect(axios.get(url)).rejects.toThrow(errorMessage);
        expect(axios.get).toHaveBeenCalledWith(url);
    });
});
