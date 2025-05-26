module.exports = {
  run: [
    {
      method: "shell.run",
      params: {
        message: [
          "git clone -b gradio-feat https://github.com/6Morpheus6/BagelGradio app",
        ]
      }
    },
    {
      method: "script.start",
      params: {
        uri: "torch.js",
        params: {
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
      method: "hf.download",
      params: {
        path: "app",
        "_": [ "ByteDance-Seed/BAGEL-7B-MoT" ],
        "include": '"*.json" "*.safetensors" "*.bin" "*.py" "*.md" "*.txt"',
        "local-dir": "ckpt",
      }
    }
  ]
}
