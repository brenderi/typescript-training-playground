export function logging(target: any, methodName: string, descriptor: PropertyDescriptor) {
  if (!descriptor) {
    descriptor = Object.getOwnPropertyDescriptor(target, methodName);
  }

  const originalMethod = descriptor.value;
  descriptor.value = function(...args) {
    const params = args.map(a => JSON.stringify(a)).join();
    const result = originalMethod.apply(this, args);
    console.log(`Call: ${methodName}(${params}) => ${JSON.stringify(result)}`);
    return result;
  }
  return descriptor;
}
