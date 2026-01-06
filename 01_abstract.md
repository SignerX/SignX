## Demos

<div class="demo-grid" style="grid-template-columns: repeat(4, minmax(180px, 1fr)); gap: 16px;">
<div class="demo-item" data-sample="3378265">
<div class="video-container">
<video controls muted loop playsinline>
<source src="static/videos/3378265.mp4" type="video/mp4">
</video>
</div>
<div class="demo-content">
<div class="demo-title">Sample 3378265</div>
<button class="button signx-run" type="button">Run Inference</button>
</div>
</div>
<div class="demo-item" data-sample="3381121">
<div class="video-container">
<video controls muted loop playsinline>
<source src="static/videos/3381121.mp4" type="video/mp4">
</video>
</div>
<div class="demo-content">
<div class="demo-title">Sample 3381121</div>
<button class="button signx-run" type="button">Run Inference</button>
</div>
</div>
<div class="demo-item" data-sample="50802118">
<div class="video-container">
<video controls muted loop playsinline>
<source src="static/videos/50802118.mp4" type="video/mp4">
</video>
</div>
<div class="demo-content">
<div class="demo-title">Sample 50802118</div>
<button class="button signx-run" type="button">Run Inference</button>
</div>
</div>
<div class="demo-item" data-sample="629983">
<div class="video-container">
<video controls muted loop playsinline>
<source src="static/videos/629983.mp4" type="video/mp4">
</video>
</div>
<div class="demo-content">
<div class="demo-title">Sample 629983</div>
<button class="button signx-run" type="button">Run Inference</button>
</div>
</div>
</div>

<pre id="signx-output" style="max-height: 320px; overflow-y: auto; background: #0b0f14; color: #c9d1d9;">Select a sample and click "Run Inference" to simulate output.</pre>

## Analysis

<style>
.signx-analysis.signx-locked {
  opacity: 0.6;
  cursor: not-allowed;
}

.signx-analysis.signx-active {
  background: #007bff;
  color: #fff;
  border-color: #007bff;
}

.signx-analysis.signx-loading {
  color: #202122;
  border-color: #a2a9b1;
}

.signx-active-button {
  border-color: #ff0000 !important;
  box-shadow: 0 0 0 2px rgba(255, 0, 0, 0.35) !important;
}

.signx-flash {
  animation: signx-flash 0.8s ease-out;
}

@keyframes signx-flash {
  0% { box-shadow: 0 0 0 0 rgba(0, 123, 255, 0.9); }
  50% { box-shadow: 0 0 0 6px rgba(0, 123, 255, 0.4); }
  100% { box-shadow: 0 0 0 0 rgba(0, 123, 255, 0); }
}
</style>

<div style="display: flex; flex-wrap: wrap; gap: 10px; margin-top: 10px;">
<button class="button signx-analysis signx-locked" type="button" data-sample="3378265"><i class="fa fa-lock"></i> Analysis 3378265</button>
<button class="button signx-analysis signx-locked" type="button" data-sample="3381121"><i class="fa fa-lock"></i> Analysis 3381121</button>
<button class="button signx-analysis signx-locked" type="button" data-sample="50802118"><i class="fa fa-lock"></i> Analysis 50802118</button>
<button class="button signx-analysis signx-locked" type="button" data-sample="629983"><i class="fa fa-lock"></i> Analysis 629983</button>
</div>
<div id="analysis-text" style="margin-top: 8px; font-size: 14px; color: #202122; white-space: pre-line;"></div>

<div style="display: grid; grid-template-columns: 1fr; gap: 16px; margin-top: 16px;">
<div>
<div class="demo-title">Feature <-> Gloss Map</div>
<div id="analysis-align-placeholder" style="border: 1px solid #a2a9b1; border-radius: 6px; padding: 16px; text-align: center; color: #666;">
<div>Locked</div>
<div>Run inference to unlock analysis ↑</div>
</div>
<img id="analysis-align" alt="Feature-to-gloss short alignment" style="width: 100%; height: auto; border: 1px solid #a2a9b1; border-radius: 6px; display: none;">
</div>
<div>
<div class="demo-title">Gloss-to-Frames</div>
<div id="analysis-gloss-placeholder" style="border: 1px solid #a2a9b1; border-radius: 6px; padding: 16px; text-align: center; color: #666;">
<div>Locked</div>
<div>Run inference to unlock analysis ↑</div>
</div>
<img id="analysis-gloss" alt="Gloss to frames" style="width: 100%; height: auto; border: 1px solid #a2a9b1; border-radius: 6px; display: none;">
</div>
</div>

<script>
(function() {
  const output = document.getElementById('signx-output');
  if (!output) return;

  const outputs = {
    '3378265': [
      '(SignX) user@host:~/project$ bash inference.sh ./eval/tiny_test_data/videos/3378265.mp4',
      '',
      '======================================================================',
      '  Sign Language Recognition - Full Inference Pipeline',
      '======================================================================',
      '',
      '  Pipeline: Video -> [Latent Space frozen] -> Features -> [CSLR in Latent] -> Gloss',
      '  Mode: inference (two-stage execution)',
      '',
      '======================================================================',
      '',
      '[Configuration]',
      '  Input video: static/videos/3378265.mp4',
      '  Output file: inference_output/inference_output_[mm-dd-xxxx]_3378265.txt',
      '  Latent Space model: latent/work_dir_pose_latent/best_model.pt',
      '  CSLR in Latent: checkpoints_pose_latent/best',
      '',
      '[1/2] Extracting video features with Latent Space...',
      '  Environment: SignX',
      '',
      '  OK Temporary video list created: /tmp/tmp.signx/video_list.txt',
      '  Loading Latent Space model...',
      '  [SLRModel] Pose assist encoder initialized',
      '  OK Feature extraction complete',
      '  Number of feature sequences: 1',
      '  OK Source/target placeholder files ready',
      '',
      'OK Stage 1 complete: features extracted',
      '',
      '[2/2] Generating gloss sequence with CSLR in Latent...',
      '  Environment: SignX',
      '',
      '  Loading CSLR in Latent model...',
      '  Running translation...',
      '',
      '  OK Inference complete: gloss sequence generated',
      '',
      'Detected detailed attention analysis, saving...',
      '  OK Saved analysis to: inference_output/detailed_prediction_[mm-dd-xxxx]/3378265',
      '',
      'Recognition result (BPE removed):',
      '----------------------------------------------------------------------',
      '  With BPE: #IF I@@ X NOT BOR@@ E IX-1p FUTURE READ IX-1p part:indef',
      '  Predicted Gloss: #IF IX NOT BORE IX-1p FUTURE READ IX-1p part:indef',
      '  Ground Truth: #IF IX NOT BORE IX-1p FUTURE READ IX-1p part:indef',
      '----------------------------------------------------------------------',
      '',
      'OK Full pipeline completed (Latent Space -> CSLR in Latent)',
      '',
      '(SignX) user@host:~/project$'
    ],
    '3381121': [
      '(SignX) user@host:~/project$ bash inference.sh ./eval/tiny_test_data/videos/3381121.mp4',
      '',
      '======================================================================',
      '  Sign Language Recognition - Full Inference Pipeline',
      '======================================================================',
      '',
      '  Pipeline: Video -> [Latent Space frozen] -> Features -> [CSLR in Latent] -> Gloss',
      '  Mode: inference (two-stage execution)',
      '',
      '======================================================================',
      '',
      '[Configuration]',
      '  Input video: static/videos/3381121.mp4',
      '  Output file: inference_output/inference_output_[mm-dd-xxxx]_3381121.txt',
      '  Latent Space model: latent/work_dir_pose_latent/best_model.pt',
      '  CSLR in Latent: checkpoints_pose_latent/best',
      '',
      '[1/2] Extracting video features with Latent Space...',
      '  Environment: SignX',
      '',
      '  OK Temporary video list created: /tmp/tmp.signx/video_list.txt',
      '  Loading Latent Space model...',
      '  [SLRModel] Pose assist encoder initialized',
      '  OK Feature extraction complete',
      '  Number of feature sequences: 1',
      '  OK Source/target placeholder files ready',
      '',
      'OK Stage 1 complete: features extracted',
      '',
      '[2/2] Generating gloss sequence with CSLR in Latent...',
      '  Environment: SignX',
      '',
      '  Loading CSLR in Latent model...',
      '  Running translation...',
      '',
      '  OK Inference complete: gloss sequence generated',
      '',
      'Detected detailed attention analysis, saving...',
      '  OK Saved analysis to: inference_output/detailed_prediction_[mm-dd-xxxx]/3381121',
      '',
      'Recognition result (BPE removed):',
      '----------------------------------------------------------------------',
      '  With BPE: BOX/ROOM I@@ X NOT-YET ARRIVE I@@ X SHOULD CONT@@ ACT ns-fs-@@ F@@ E@@ DE@@ X',
      '  Predicted Gloss: BOX/ROOM IX NOT-YET ARRIVE IX SHOULD CONTACT ns-fs-FEDEX',
      '  Ground Truth: BOX/ROOM IX NOT-YET ARRIVE IX SHOULD CONTACT ns-fs-FEDEX',
      '----------------------------------------------------------------------',
      '',
      'OK Full pipeline completed (Latent Space -> CSLR in Latent)',
      '',
      '(SignX) user@host:~/project$'
    ],
    '50802118': [
      '(SignX) user@host:~/project$ bash inference.sh ./eval/tiny_test_data/videos/50802118.mp4',
      '',
      '======================================================================',
      '  Sign Language Recognition - Full Inference Pipeline',
      '======================================================================',
      '',
      '  Pipeline: Video -> [Latent Space frozen] -> Features -> [CSLR in Latent] -> Gloss',
      '  Mode: inference (two-stage execution)',
      '',
      '======================================================================',
      '',
      '[Configuration]',
      '  Input video: static/videos/50802118.mp4',
      '  Output file: inference_output/inference_output_[mm-dd-xxxx]_50802118.txt',
      '  Latent Space model: latent/work_dir_pose_latent/best_model.pt',
      '  CSLR in Latent: checkpoints_pose_latent/best',
      '',
      '[1/2] Extracting video features with Latent Space...',
      '  Environment: SignX',
      '',
      '  OK Temporary video list created: /tmp/tmp.signx/video_list.txt',
      '  Loading Latent Space model...',
      '  [SLRModel] Pose assist encoder initialized',
      '  OK Feature extraction complete',
      '  Number of feature sequences: 1',
      '  OK Source/target placeholder files ready',
      '',
      'OK Stage 1 complete: features extracted',
      '',
      '[2/2] Generating gloss sequence with CSLR in Latent...',
      '  Environment: SignX',
      '',
      '  Loading CSLR in Latent model...',
      '  Running translation...',
      '',
      '  OK Inference complete: gloss sequence generated',
      '',
      'Detected detailed attention analysis, saving...',
      '  OK Saved analysis to: inference_output/detailed_prediction_[mm-dd-xxxx]/50802118',
      '',
      'Recognition result (BPE removed):',
      '----------------------------------------------------------------------',
      '  With BPE: I@@ X ns-fs-JOHN HAVE DIFFERENT C@@ A@@ R',
      '  Predicted Gloss: IX ns-fs-JOHN HAVE DIFFERENT CAR',
      '  Ground Truth: IX ns-fs-JOHN HAVE DIFFERENT CAR',
      '----------------------------------------------------------------------',
      '',
      'OK Full pipeline completed (Latent Space -> CSLR in Latent)',
      '',
      '(SignX) user@host:~/project$'
    ],
    '629983': [
      '(SignX) user@host:~/project$ bash inference.sh ./eval/tiny_test_data/videos/629983.mp4',
      '',
      '======================================================================',
      '  Sign Language Recognition - Full Inference Pipeline',
      '======================================================================',
      '',
      '  Pipeline: Video -> [Latent Space frozen] -> Features -> [CSLR in Latent] -> Gloss',
      '  Mode: inference (two-stage execution)',
      '',
      '======================================================================',
      '',
      '[Configuration]',
      '  Input video: static/videos/629983.mp4',
      '  Output file: inference_output/inference_output_[mm-dd-xxxx]_629983.txt',
      '  Latent Space model: latent/work_dir_pose_latent/best_model.pt',
      '  CSLR in Latent: checkpoints_pose_latent/best',
      '',
      '[1/2] Extracting video features with Latent Space...',
      '  Environment: SignX',
      '',
      '  OK Temporary video list created: /tmp/tmp.signx/video_list.txt',
      '  Loading Latent Space model...',
      '  [SLRModel] Pose assist encoder initialized',
      '  OK Feature extraction complete',
      '  Number of feature sequences: 1',
      '  OK Source/target placeholder files ready',
      '',
      'OK Stage 1 complete: features extracted',
      '',
      '[2/2] Generating gloss sequence with CSLR in Latent...',
      '  Environment: SignX',
      '',
      '  Loading CSLR in Latent model...',
      '  Running translation...',
      '',
      '  OK Inference complete: gloss sequence generated',
      '',
      'Detected detailed attention analysis, saving...',
      '  OK Saved analysis to: inference_output/detailed_prediction_[mm-dd-xxxx]/629983',
      '',
      'Recognition result (BPE removed):',
      '----------------------------------------------------------------------',
      '  With BPE: I@@ X FINISH WORK WH@@ E@@ N I@@ X',
      '  Predicted Gloss: IX FINISH WORK WHEN IX',
      '  Ground Truth: IX FINISH WORK WHEN IX',
      '----------------------------------------------------------------------',
      '',
      'OK Full pipeline completed (Latent Space -> CSLR in Latent)',
      '',
      '(SignX) user@host:~/project$'
    ]
  };

  let typingTimer = null;

  function renderLines(lines, onProgress) {
    if (typingTimer) {
      clearInterval(typingTimer);
      typingTimer = null;
    }
    output.textContent = '';
    const batches = [];
    for (let i = 0; i < lines.length; i += 1) {
      const line = lines[i];
      if (line.startsWith('[Configuration]')) {
        const group = [line];
        while (i + 1 < lines.length && lines[i + 1].startsWith('  ')) {
          i += 1;
          group.push(lines[i]);
        }
        batches.push({ lines: group, baseDelay: 90 });
        continue;
      }
      if (line.startsWith('====') || line.startsWith('  Pipeline:') || line.startsWith('  Mode:')) {
        const group = [line];
        while (i + 1 < lines.length && lines[i + 1].startsWith('====')) {
          i += 1;
          group.push(lines[i]);
        }
        batches.push({ lines: group, baseDelay: 60 });
        continue;
      }
      if (
        line.includes('Extracting features') ||
        line.includes('Processing sample') ||
        line.includes('Regenerating') ||
        line.includes('Saving') ||
        line.includes('Extracting') ||
        line.includes('Mapping') ||
        line.includes('Running translation')
      ) {
        batches.push({ lines: [line], baseDelay: 240 });
        continue;
      }
      if (line.trim() === '') {
        batches.push({ lines: [''], baseDelay: 50 });
        continue;
      }
      batches.push({ lines: [line], baseDelay: 120 });
    }

    const totalMs = 3000 + Math.floor(Math.random() * 8000);
    const baseSum = batches.reduce((sum, batch) => sum + batch.baseDelay, 0);
    const scale = baseSum > 0 ? totalMs / baseSum : 1;
    let batchIndex = 0;

    const emitBatch = () => {
      if (batchIndex >= batches.length) {
        typingTimer = null;
        if (onProgress) {
          onProgress(100, true);
        }
        return;
      }
      const batch = batches[batchIndex];
      output.textContent += batch.lines.join('\n') + '\n';
      output.scrollTop = output.scrollHeight;
      batchIndex += 1;
      if (onProgress) {
        const progress = Math.floor((batchIndex / batches.length) * 100);
        onProgress(progress, false);
      }
      const jitter = Math.floor(Math.random() * 30) - 10;
      const delay = Math.max(40, Math.floor(batch.baseDelay * scale) + jitter);
      typingTimer = setTimeout(emitBatch, delay);
    };

    emitBatch();
  }

  function showLogs(sampleId) {
    const lines = outputs[sampleId];
    if (!lines) {
      output.textContent = 'No output available for this sample.';
      return;
    }
    output.textContent = lines.join('\n') + '\n';
  }

  function flashDemoCard(sampleId) {
    const card = document.querySelector(`.demo-item[data-sample="${sampleId}"]`);
    if (!card) return;
    card.classList.remove('signx-flash');
    void card.offsetWidth;
    card.classList.add('signx-flash');
  }

  function flashAnalysisImages() {
    const targets = [alignImg, glossImg].filter(Boolean);
    targets.forEach((img) => {
      img.classList.remove('signx-flash');
      void img.offsetWidth;
      img.classList.add('signx-flash');
    });
  }

  function getButtonSampleId(button) {
    if (button.classList.contains('signx-run')) {
      const card = button.closest('.demo-item');
      return card ? card.getAttribute('data-sample') : null;
    }
    return button.getAttribute('data-sample');
  }

  function setActiveButtons(sampleId) {
    document.querySelectorAll('.signx-run, .signx-analysis').forEach((btn) => {
      const matches = getButtonSampleId(btn) === sampleId;
      btn.classList.toggle('signx-active-button', matches);
    });
  }

  document.querySelectorAll('.demo-item').forEach((card) => {
    const button = card.querySelector('.signx-run');
    if (!button) return;
    button.addEventListener('click', () => {
      const sample = card.getAttribute('data-sample');
      setActiveButtons(sample);
      const lines = outputs[sample];
      if (!lines) {
        output.textContent = 'No output available for this sample.';
        return;
      }
      startAnalysisProgress(sample);
      renderLines(lines, (progress, done) => {
        setAnalysisProgress(sample, progress);
        if (done) {
          finishAnalysisProgress(sample);
          setAnalysis(sample);
        }
      });
      output.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  const analysisMap = {
    '3378265': {
      align: 'static/images/3378265_frame_alignment_short.png',
      gloss: 'static/images/3378265_gloss_to_frames.png',
      text: 'With BPE: #IF I@@ X NOT BOR@@ E IX-1p FUTURE READ IX-1p part:indef\nPredicted Gloss: #IF IX NOT BORE IX-1p FUTURE READ IX-1p part:indef\nGround Truth: #IF IX NOT BORE IX-1p FUTURE READ IX-1p part:indef'
    },
    '3381121': {
      align: 'static/images/3381121_frame_alignment_short.png',
      gloss: 'static/images/3381121_gloss_to_frames.png',
      text: 'With BPE: BOX/ROOM I@@ X NOT-YET ARRIVE I@@ X SHOULD CONT@@ ACT ns-fs-@@ F@@ E@@ DE@@ X\nPredicted Gloss: BOX/ROOM IX NOT-YET ARRIVE IX SHOULD CONTACT ns-fs-FEDEX\nGround Truth: BOX/ROOM IX NOT-YET ARRIVE IX SHOULD CONTACT ns-fs-FEDEX'
    },
    '50802118': {
      align: 'static/images/50802118_frame_alignment_short.png',
      gloss: 'static/images/50802118_gloss_to_frames.png',
      text: 'With BPE: I@@ X ns-fs-JOHN HAVE DIFFERENT C@@ A@@ R\nPredicted Gloss: IX ns-fs-JOHN HAVE DIFFERENT CAR\nGround Truth: IX ns-fs-JOHN HAVE DIFFERENT CAR'
    },
    '629983': {
      align: 'static/images/629983_frame_alignment_short.png',
      gloss: 'static/images/629983_gloss_to_frames.png',
      text: 'With BPE: I@@ X FINISH WORK WH@@ E@@ N I@@ X\nPredicted Gloss: IX FINISH WORK WHEN IX\nGround Truth: IX FINISH WORK WHEN IX'
    }
  };

  const alignImg = document.getElementById('analysis-align');
  const glossImg = document.getElementById('analysis-gloss');
  const alignPlaceholder = document.getElementById('analysis-align-placeholder');
  const glossPlaceholder = document.getElementById('analysis-gloss-placeholder');
  const analysisText = document.getElementById('analysis-text');

  function setAnalysis(sampleId) {
    const entry = analysisMap[sampleId];
    if (!entry) return;
    alignImg.src = entry.align;
    glossImg.src = entry.gloss;
    if (analysisText) {
      analysisText.textContent = entry.text || '';
    }
  }

  document.querySelectorAll('.signx-analysis').forEach((button) => {
    button.addEventListener('click', () => {
      if (button.classList.contains('signx-locked')) {
        return;
      }
      if (button.classList.contains('signx-loading')) {
        return;
      }
      const sample = button.getAttribute('data-sample');
      setActiveButtons(sample);
      setAnalysis(sample);
      setActiveAnalysis(sample);
      showLogs(sample);
      flashDemoCard(sample);
      flashAnalysisImages();
    });
  });

  function setActiveAnalysis(sampleId) {
    document.querySelectorAll('.signx-analysis').forEach((btn) => {
      btn.classList.toggle('signx-active', btn.getAttribute('data-sample') === sampleId);
    });
  }

  function setAnalysisProgress(sampleId, percent) {
    const button = document.querySelector(`.signx-analysis[data-sample="${sampleId}"]`);
    if (!button) return;
    if (percent >= 100) {
      button.style.background = '#007bff';
      button.style.color = '#fff';
      button.style.borderColor = '#007bff';
      return;
    }
    button.style.background = `linear-gradient(90deg, #007bff ${percent}%, #f8f9fa ${percent}%)`;
    button.style.color = '#202122';
  }

  function startAnalysisProgress(sampleId) {
    const button = document.querySelector(`.signx-analysis[data-sample="${sampleId}"]`);
    if (!button) return;
    button.classList.remove('signx-locked');
    button.classList.remove('signx-active');
    button.classList.add('signx-loading');
    const icon = button.querySelector('i');
    if (icon) {
      icon.classList.remove('fa-lock');
      icon.classList.add('fa-lock-open');
    }
    setAnalysisProgress(sampleId, 0);
    setActiveAnalysis(sampleId);
  }

  function finishAnalysisProgress(sampleId) {
    const button = document.querySelector(`.signx-analysis[data-sample="${sampleId}"]`);
    if (!button) return;
    button.classList.remove('signx-loading');
    setActiveAnalysis(sampleId);
    if (alignPlaceholder && glossPlaceholder) {
      alignPlaceholder.style.display = 'none';
      glossPlaceholder.style.display = 'none';
    }
    if (alignImg && glossImg) {
      alignImg.style.display = 'block';
      glossImg.style.display = 'block';
    }
    setAnalysisProgress(sampleId, 100);
  }
})();
</script>
