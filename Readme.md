# HumanNeRF

## A free view-point rendering of a monocular video

This project consists of three folders, each with its own set of instructions. Follow the steps below to run the project.

## humanNeRF (The ML inference code)

Navigate to the `humanNeRF` directory and follow the instructions in the [README.md](./humanNeRF/README.md) file to set up the conda environment and run the code.

Steps for setting up the Machine learning model for inference

## Step 1:

The first step is to download the SMPL model from the link which is provided in the above given Readme file and then follow the setup instructions there.

## Step 2: Download the ZJU-Mocap Dataset

First Download the zju-mocap dataset from the drive link [here](https://drive.google.com/drive/folders/16GgIYBidWL5a9rjcA13oKbX22wTT5xMo)

Secondly, preprocess the dataset by the some scripts which are provided in the above humanNeRF directory

A detailed explaining for downloading and preprocessing the dataset are provided in this readme file [here](./humanNeRF/README.md#prepare-a-dataset)

Next, if you wish to download a pre-trained model instead of training the model by yourself on a GPU enabled machine you can follow the instructions provided [here](./humanNeRF/README.md#train-a-model)

If you want to run the model on your own on a CUDA supported NVIDIA GPU's on your machine you can make you of a GPU configuration that supports your training setup. We have a configuration to run the entire model on a single GPU as well as a configuration to run the model on multiple GPU's

## humannerf-web-client

This folder contains the code for the frontend web application which we have built using React framework with vite as the build engine.

This applicaiton accepts any kind of a video file and sends it the backend applicaiton and received the rendered output from the backend and it plays the video in the frotnend web applicaiton.

To run the frontend application, follow the instructions given below

Firstly you need to install nodejs framework from here [nodejs](https://nodejs.org/en) we have used the v20.10.0 which also installes the node package manager (npm) to manage the javascript libraries

```bash
$ cd ./humannerf-web-client
```

## Installing all the required dependencies

```bash
$ cd npm install
```

## To run the frontend application

```bash
$ npm run dev
```

This command will create a development server and runs the frontend applicaiton on 5173 port. if you enter o + enter on your key board once after the server starts it automatically open a tab in your default browser for the application.

The application has an input field to upload video for which we want to render the free-viwepoint video. Once we select the video file it send the file to the backend flask server to run the inference. Then the server sends back the output video which will be played in the frotnend application

## humannerf-web-server

This folder contains a backend web server build on Python's Flask framework which accepts the video that is sent from the frontend react application and sends it to run the inference and then then responds with the output video which is a freeview render of the inference's output.

### Backend setup

To setup and run the backend server follow below instructions

```bash
$ cd ./humannerf-web-server
```

if its a windows machine

```bash
$ ./venv/Scripts/activate
```

on a Mac machine

```bash
$ source ./venv/Scripts/activate
```

one the virtual environment is created then run the below command to install all the depencies

```bash
$ pip install -r requirements.txt
```

once all the dependencies are installed, run the app.py file to start a backend server on port 5000 which is a default port for the Flask framework by using the following command

```python
$ python app.py
```

This command will run the backend server on port 5000 which exposes two rest endpoint to accept the input video from the frontend application by using a HTTP multipart formdata request. and it also exposes another HTTP endpoint to stream the output video generate by our ML model back to the frontend. we have used the open cv framework to achieve this feature.

## Jupyter notebook Humannerf.ipynb

The Jupyter notebook provided here has the code to run our inference on the google colab instance. As we have faced so many problems while running our ML model on our own machines becuase this task required a lot of computation power which can only be achieved if we make use of any accelerators like GPU or a TPU (tensor processing unit). To run the inference on a video using the Google colab engine you can either upload this notebook to your drive account and open it in google colab instance or click [here](https://colab.research.google.com/drive/1RGiT2B9D23KMVizM1RrmZSdXPaGzvcmp?usp=sharing) and connect to a GPU instance, once the instace is up and running you can start training the model by following the same instructions as mention in the readme file [here](<(./humanNeRF/README.md)>)

> **_NOTE:_**

    The backend code that is provided here is currently unable to run the inference by itself because in order to do that we need to deploy our backend server on a GPU machine which should atleast be equipped with 4 NVIDIA RTX 2080Ti GPU's. Hence for now we are just taking the video input manually and running the inference on the google colab instance by using the code provived in the jupyter notebook above.

## Citation

```BibTeX
@InProceedings{weng_humannerf_2022_cvpr,
    title     = {Human{N}e{RF}: Free-Viewpoint Rendering of Moving People From Monocular Video},
    author    = {Weng, Chung-Yi and
                 Curless, Brian and
                 Srinivasan, Pratul P. and
                 Barron, Jonathan T. and
                 Kemelmacher-Shlizerman, Ira},
    booktitle = {Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR)},
    month     = {June},
    year      = {2022},
    pages     = {16210-16220}
}
```

```BibTeX
@misc{peng2021neural,
      title={Neural Body: Implicit Neural Representations with Structured Latent Codes for Novel View Synthesis of Dynamic Humans},
      author={Sida Peng and Yuanqing Zhang and Yinghao Xu and Qianqian Wang and Qing Shuai and Hujun Bao and Xiaowei Zhou},
      year={2021},
      eprint={2012.15838},
      archivePrefix={arXiv},
      primaryClass={cs.CV}
}
```
