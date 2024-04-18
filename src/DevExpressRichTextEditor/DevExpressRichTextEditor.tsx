import 'devexpress-richedit/dist/dx.richedit.css';

import {
  create, createOptions, RichEdit, RichEditUnit, ViewType
} from 'devexpress-richedit';
import { loadMessages } from 'devextreme/localization';
import {
  Fragment, useEffect, useRef, useState
} from 'react';

import RichEditFrTranslations from '@/RichEditLocales/dx-rich.fr.json';
import RichEditNlTranslations from '@/RichEditLocales/dx-rich.nl.json';

export interface IDevExpressRichTextEditor {
  renderLoader: () => JSX.Element;
  isDocumentFileUpdating: boolean;
  fileName: string;
  file?: File | Blob;
  onSaving?: (file: Blob) => Promise<void>;
  onEditRequest?: () => Promise<boolean>;
  isDocumentFileLockRequestLoading ?: boolean;
  canUpdate?: boolean;
}

function DevExpressRichTextEditor({
  renderLoader,
  file,
  onSaving,
  isDocumentFileUpdating,
  isDocumentFileLockRequestLoading = false,
  fileName,
  onEditRequest,
  canUpdate = true
}: IDevExpressRichTextEditor) {
  loadMessages(RichEditFrTranslations);
  loadMessages(RichEditNlTranslations);

  const editorInstance = useRef<RichEdit>();
  const firstRendered = useRef(false);
  const [isInstantiating, setIsInstantiating] = useState(true);
  const [isReadonly, setIsReadOnly] = useState(true);

  useEffect(() => {
    if (editorInstance.current && firstRendered.current) {
      editorInstance.current.updateRibbon(ribbon => ribbon.visible = !isReadonly);
      editorInstance.current.readOnly = isReadonly;
    }
  }, [isReadonly]);

  useEffect(() => {
    const options = createOptions();
    options.width = '100%';
    options.height = 'calc(100vh - 140px)';

    options.confirmOnLosingChanges = {
      enabled: true,
      message: 'Are you sure you want to perform the action? All unsaved document data will be lost.'
    };

    options.unit = RichEditUnit.Centimeter;

    options.fields = {
      updateFieldsBeforePrint: true,
      updateFieldsOnPaste: true
    };

    options.events.saving = (inst) => {
      inst.exportToBlob((f) => {
        onSaving?.(f)?.then(() => setIsReadOnly(true));
      });
    };

    options.ribbon.visible = !isReadonly;
    options.readOnly = isReadonly;

    options.view = {
      viewType: ViewType.PrintLayout,
      simpleViewSettings: {
        paddings: {
          left: 10,
          top: 10,
          right: 10,
          bottom: 10
        }
      }
    };

    const editorContainer = document.getElementById('devExpressRichTextEditor');
    if (editorContainer === null) {
      throw new Error('Rich editor container does not exist');
    }
    editorInstance.current = create(editorContainer, options);

    setIsInstantiating(false);

    firstRendered.current = true;

    return () => {
      editorInstance.current?.dispose();
      editorInstance.current = undefined;
    };
  }, []);

  useEffect(() => {
    if (file !== undefined && !isInstantiating) {
      editorInstance.current?.openDocument(file, fileName);
    }
  }, [file, isInstantiating]);

  return (
    <Fragment>
      {(isInstantiating || isDocumentFileUpdating || isDocumentFileLockRequestLoading) && renderLoader()}
      {canUpdate && isReadonly && (
        <div className="flex items-center gap-2 mb-2">
          File readonly
          <button
            className="transition duration-500 inline-block bg-blue-800 hover:bg-blue-900 text-white"
            onClick={(e) => {
              e.preventDefault();
              if (onEditRequest) {
                onEditRequest()
                  .then(isLocked => {
                    setIsReadOnly(!isLocked);
                  });
              } else {
                setIsReadOnly(false);
              }
            }}
          >
            Update file
          </button>
        </div>
      )}
      <div id="devExpressRichTextEditor" />
    </Fragment>
  );
}

export { DevExpressRichTextEditor };