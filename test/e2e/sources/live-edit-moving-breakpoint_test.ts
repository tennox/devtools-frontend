// Copyright 2022 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import {assert} from 'chai';

import {$textContent, assertNotNullOrUndefined, getBrowserAndPages, pressKey, step, waitFor} from '../../shared/helper.js';
import {describe, it} from '../../shared/mocha-extensions.js';
import {addBreakpointForLine, isBreakpointSet, openSourceCodeEditorForFile, reloadPageAndWaitForSourceFile} from '../helpers/sources-helpers.js';

describe('Live edit', async () => {
  it('moves the breakpoint after reload when changes are not persisted', async () => {
    const {frontend, target} = getBrowserAndPages();
    await openSourceCodeEditorForFile('live-edit-moving-breakpoint.js', 'live-edit-moving-breakpoint.html');

    await step('add two newlines to the script', async () => {
      const editorContent = await waitFor('.cm-content');
      const markerLine = await $textContent('// Insertion marker for newline.', editorContent);
      assertNotNullOrUndefined(markerLine);

      const bb = await markerLine.boundingBox();
      assertNotNullOrUndefined(bb);

      // Click a few pixels after the comment, to make sure the input carrot
      // is really after the last character.
      await frontend.mouse.click(bb.x + bb.width + 5, bb.y + (bb.height * 0.5));
      await frontend.keyboard.press('Enter');
      await frontend.keyboard.press('Enter');
    });

    await step('save the script and wait for the save to go through', async () => {
      await pressKey('s', {control: true});
      await waitFor('[aria-label="live-edit-moving-breakpoint.js"]');
    });

    await step('set a breakpoint in the "await" line', async () => {
      await addBreakpointForLine(frontend, 9);
    });

    await step('reload the page and verify that the breakpoint has moved', async () => {
      await reloadPageAndWaitForSourceFile(frontend, target, 'live-edit-moving-breakpoint.js');
      await openSourceCodeEditorForFile('live-edit-moving-breakpoint.js', 'live-edit-moving-breakpoint.html');

      // TODO(crbug.com/1216904): Flip this assumption once crbug.com/1216904 is fixed.
      //     We currently expect the bugged state to make sure the test keeps running
      //     and is maintained.
      assert.isTrue(await isBreakpointSet(9));
      assert.isFalse(await isBreakpointSet(7));
    });
  });
});
