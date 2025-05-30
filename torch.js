module.exports = {
  run: [
    // windows nvidia 50 series
    {
      "when": "{{platform === 'win32' && gpu === 'nvidia' && kernel.gpus && kernel.gpus.find(x => / 50.+/.test(x.model))}}",
      "method": "shell.run",
      "params": {
        "venv_python": "{{args && args.venv_python ? args.venv_python : null}}",
        "venv": "{{args && args.venv ? args.venv : null}}",
        "path": "{{args && args.path ? args.path : '.'}}",
        "message": [
          "uv pip install torch torchvision torchaudio {{args && args.xformers ? 'xformers' : ''}} --index-url https://download.pytorch.org/whl/cu128",
          "uv pip install https://github.com/loscrossos/lib_flashattention/releases/download/v2.7.4.post1_crossos00/flash_attn-2.7.4.post1-cp312-cp312-win_amd64.whl",
          "{{args && args.triton ? 'uv pip install -U --pre triton-windows' : ''}}",
          "{{args && args.sageattention ? 'uv pip install https://github.com/woct0rdho/SageAttention/releases/download/v2.1.1-windows/sageattention-2.1.1+cu128torch2.7.0-cp310-cp310-win_amd64.whl' : ''}}",
        ]
      },
      "next": null
    },
    // windows nvidia
    {
      "when": "{{platform === 'win32' && gpu === 'nvidia'}}",
      "method": "shell.run",
      "params": {
        "venv_python": "{{args && args.venv_python ? args.venv_python : null}}",
        "venv": "{{args && args.venv ? args.venv : null}}",
        "path": "{{args && args.path ? args.path : '.'}}",
        "message": [
          "uv pip install torch==2.6.0 torchvision==0.21.0 torchaudio==2.6.0 {{args && args.xformers ? 'xformers' : ''}} --index-url https://download.pytorch.org/whl/cu124",
          "uv pip install https://huggingface.co/lldacing/flash-attention-windows-wheel/resolve/main/flash_attn-2.7.4%2Bcu124torch2.6.0cxx11abiFALSE-cp312-cp312-win_amd64.whl",
          "{{args && args.triton ? 'uv pip install -U triton-windows' : ''}} --force-reinstall",
          "{{args && args.sageattention ? 'uv pip install https://github.com/deepbeepmeep/SageAttention/raw/refs/heads/main/releases/sageattention-2.1.0-cp310-cp310-win_amd64.whl --force-reinstall' : ''}}"
        ]
      },
      "next": null
    },
    // windows amd
    {
      "when": "{{platform === 'win32' && gpu === 'amd'}}",
      "method": "shell.run",
      "params": {
        "venv_python": "{{args && args.venv_python ? args.venv_python : null}}",
        "venv": "{{args && args.venv ? args.venv : null}}",
        "path": "{{args && args.path ? args.path : '.'}}",
        "message": "uv pip install torch-directml torchaudio torchvision numpy==1.26.4"
      },
      "next": null
    },
    // windows cpu
    {
      "when": "{{platform === 'win32' && (gpu !== 'nvidia' && gpu !== 'amd')}}",
      "method": "shell.run",
      "params": {
        "venv_python": "{{args && args.venv_python ? args.venv_python : null}}",
        "venv": "{{args && args.venv ? args.venv : null}}",
        "path": "{{args && args.path ? args.path : '.'}}",
        "message": "uv pip install torch torchvision torchaudio numpy==1.26.4"
      },
      "next": null
    },
    // mac
    {
      "when": "{{platform === 'darwin'}}",
      "method": "shell.run",
      "params": {
        "venv_python": "{{args && args.venv_python ? args.venv_python : null}}",
        "venv": "{{args && args.venv ? args.venv : null}}",
        "path": "{{args && args.path ? args.path : '.'}}",
        "message": "uv pip install torch torchvision torchaudio"
      },
      "next": null
    },
    // linux nvidia 50 series
    {
      "when": "{{platform === 'linux' && gpu === 'nvidia' && kernel.gpus && kernel.gpus.find(x => / 50.+/.test(x.model))}}",
      "method": "shell.run",
      "params": {
        "venv_python": "{{args && args.venv_python ? args.venv_python : null}}",
        "venv": "{{args && args.venv ? args.venv : null}}",
        "path": "{{args && args.path ? args.path : '.'}}",
        "message": [
          "uv pip install torch torchvision torchaudio {{args && args.xformers ? 'xformers' : ''}} --index-url https://download.pytorch.org/whl/cu128",
          "uv pip install https://github.com/loscrossos/lib_flashattention/releases/download/v2.7.4.post1_crossos00/flash_attn-2.7.4.post1-cp312-cp312-linux_x86_64.whl",
          "{{args && args.sageattention ? 'uv pip install git+https://github.com/thu-ml/SageAttention.git' : ''}}"
        ]
      },
      "next": null
    },
    // linux nvidia
    {
      "when": "{{platform === 'linux' && gpu === 'nvidia'}}",
      "method": "shell.run",
      "params": {
        "venv_python": "{{args && args.venv_python ? args.venv_python : null}}",
        "venv": "{{args && args.venv ? args.venv : null}}",
        "path": "{{args && args.path ? args.path : '.'}}",
        "message": [
          "uv pip install torch==2.6.0 torchvision==0.21.0 torchaudio==2.6.0 {{args && args.xformers ? 'xformers' : ''}} --index-url https://download.pytorch.org/whl/cu124",
          "uv pip install ninja",
          "uv pip install flash_attn",
          "{{args && args.sageattention ? 'uv pip install git+https://github.com/thu-ml/SageAttention.git' : ''}}"
        ]
      },
      "next": null
    },
    // linux rocm (amd)
    {
      "when": "{{platform === 'linux' && gpu === 'amd'}}",
      "method": "shell.run",
      "params": {
        "venv_python": "{{args && args.venv_python ? args.venv_python : null}}",
        "venv": "{{args && args.venv ? args.venv : null}}",
        "path": "{{args && args.path ? args.path : '.'}}",
        "message": "uv pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/rocm6.2.4"
      },
      "next": null
    },
    // linux cpu
    {
      "when": "{{platform === 'linux' && (gpu !== 'amd' && gpu !=='nvidia')}}",
      "method": "shell.run",
      "params": {
        "venv_python": "{{args && args.venv_python ? args.venv_python : null}}",
        "venv": "{{args && args.venv ? args.venv : null}}",
        "path": "{{args && args.path ? args.path : '.'}}",
        "message": "uv pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu"
      },
      "next": null
    }
  ]
}
