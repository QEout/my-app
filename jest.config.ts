module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>'],
  // 测试文件是src目录下*.test.jsx或者*.test.tsx的文件
  testRegex: 'src/(.+)\\.test\\.(jsx?|tsx?)$', 
  // 自定义转换方式，转换jsx、tsx文件
  transform: {
    '^.+\\.(j|t)sx?$': '<rootDir>/node_modules/babel-jest',
  },
  // 模块资源映射，例如alias的配置
  moduleNameMapper: {
    // 用于css、js、图片等文件的mock
    '\\.(css|less|scss)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': 'identity-obj-proxy',
    // alias
    '^@mock/(.*)$': '<rootDir>/mock/$1',
  },
  testPathIgnorePatterns: ['\\node_modules\\'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  // 覆盖率从哪些文件收集，设置后即使0覆盖率的文件也会计算进来
  collectCoverageFrom: ['src/**/*.{ts,tsx,js,jsx}', '!**/node_modules/**', '!**/dist/**'],
  // 测试报告输出地址
  coverageDirectory: '<rootDir>/coverage',
  // 在每个测试文件执行之前，运行一些代码以配置或设置测试框架。
  setupFilesAfterEnv: ['./src/test/setupTests.js']
};