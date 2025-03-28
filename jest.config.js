module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      tsconfig: {
        target: 'ES6',
        experimentalDecorators: true,
        esModuleInterop: true,
        emitDecoratorMetadata: true
      },
    },
  },
  transform: {
    '^.+\\.(t|j)sx?$': 'ts-jest',
  },
};
