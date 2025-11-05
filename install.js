module.exports = {
  run: [
    {
      when: "{{gpu === 'amd' || platform === 'darwin'}}",
      method: "notify",
      params: {
        html: "This app requires an NVIDIA GPU. Not compatible with AMD GPUs and macOS."
      },
      next: null
    },
    {
      method: "shell.run",
      params: {
        message: [
          "git clone -b gradio-feat https://github.com/6Morpheus6/BagelGradio app",
        ]
      }
    },
    {
      method: "shell.run",
      params: {
        message: "conda update -y -c conda-forge huggingface_hub"
      }
    },
    {
      method: "script.start",
      params: {
        uri: "torch.js",
        params: {
          venv_python: "3.12",
          venv: "env",
          path: "app",
          // xformers: true,
          // triton: true,
          // sageattention: true
        }
      }
    },
    {
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",
        message: [
          "uv pip install gradio",
          "uv pip install -r ../requirements.txt"
        ]
      }
    },
    {
      method: "shell.run",
      params: {
        path: "app",
        message: 'hf download ByteDance-Seed/BAGEL-7B-MoT --exclude "*.md" --local-dir ckpt && dir'
      }
    }
  ]
}
