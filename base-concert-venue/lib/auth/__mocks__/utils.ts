module.exports = {
  esModule: true,
  validateToken: jest.fn().mockResolvedValue(true),
};

// to satisfy TS
export {};

// mock module in test file using jest.mock
// jest.mock("@/lib/auth/utils")
