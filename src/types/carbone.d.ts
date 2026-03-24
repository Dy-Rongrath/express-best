declare module "carbone" {
  type RenderOptions = {
    convertTo?: string;
  };

  type RenderCallback = (err: Error | null, result: Buffer, reportName?: string) => void;

  const carbone: {
    render: (
      templatePath: string,
      data: object,
      options: RenderOptions,
      callback: RenderCallback,
    ) => void;
  };

  export default carbone;
}
