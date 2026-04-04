import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePrescriptionFlowStore } from '../../stores/prescriptionFlowStore';
import MobileContainer from '../layout/MobileContainer';
import AppHeader from '../layout/AppHeader';

const imgIconPicture = 'https://www.figma.com/api/mcp/asset/4203ac5d-db09-4469-8eee-5ada37368255';
const imgIconCheck = 'https://www.figma.com/api/mcp/asset/5af20cae-35ab-4c36-81ad-2ad5a2ee05bf';
const imgIconCamera = 'https://www.figma.com/api/mcp/asset/543a5674-ae46-4917-b8fd-e781c290de1f';

export default function PrescriptionTranslatePage() {
  const navigate = useNavigate();
  const selectFile = usePrescriptionFlowStore((state) => state.selectFile);
  const previewUrl = usePrescriptionFlowStore((state) => state.previewUrl);
  const [showSheet, setShowSheet] = useState(false);

  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const nextPreviewUrl = URL.createObjectURL(file);
    selectFile(file, nextPreviewUrl);
    setShowSheet(false);
    navigate('/prescriptions/loading');
  };

  return (
    <MobileContainer
      hasBottomNav
      header={
        <AppHeader
          title="처방전 스캔"
          rightElement={
            <div className="absolute right-[20px] flex h-[22px] items-center justify-center rounded-[11px] bg-[#296dff] px-[10px]">
              <span className="font-['SUIT',sans-serif] text-[12px] font-bold tracking-[-0.6px] text-white">
                STEP 1 / 2
              </span>
            </div>
          }
        />
      }
    >
      <div className="flex flex-col gap-[20px] px-[20px] py-[20px]">
        <div className="flex h-[130px] items-center gap-[18px] rounded-[10px] border border-[#d1d5db] px-[24px]">
          <div className="flex h-[84px] w-[84px] shrink-0 items-center justify-center rounded-[8px] bg-[#f9f9fb]">
            <img src={imgIconPicture} alt="" className="h-[46px] w-[46px] object-contain" />
          </div>
          <div className="flex flex-col items-start gap-[6px] text-left">
            <p className="text-[18px] font-medium tracking-[-0.9px] text-[#111827]">처방전을 스캔해주세요.</p>
            <p className="text-[14px] font-medium leading-[1.5] tracking-[-0.7px] text-[#6b7280]">
              AI가 처방전을 분석해서 주요 정보와
              <br />
              복용 방법을 정리해드립니다.
            </p>
          </div>
        </div>

        <div
          className="relative flex h-[200px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[10px] border-[1.5px] border-dashed border-[#d1d5db]"
          onClick={() => setShowSheet(true)}
        >
          {previewUrl ? (
            <img src={previewUrl} alt="처방전 미리보기" className="h-full w-full object-cover" />
          ) : (
            <>
              <div className="absolute left-[-11px] top-[-11px] flex h-[22px] w-[22px] items-center justify-center rounded-full bg-[#296dff] text-[16px] font-bold leading-none text-white">
                +
              </div>
              <div className="flex h-[120px] w-[120px] items-center justify-center rounded-[10px] bg-[#f3f4f6]">
                <img src={imgIconCamera} alt="camera" className="h-[38px] w-[49px] object-contain" />
              </div>
            </>
          )}
        </div>

        <p className="-mt-[8px] text-center text-[18px] font-medium tracking-[-0.9px] text-[#111827]">
          처방전을 프레임 안에 맞춰주세요.
        </p>

        <div className="flex flex-col items-start rounded-[10px] bg-[#caffe8] px-[24px] py-[22px] text-left">
          <div className="mb-[10px] flex items-center gap-[10px]">
            <img src={imgIconCheck} alt="" className="h-[20px] w-[20px] shrink-0" />
            <p className="text-[20px] font-bold tracking-[-1px] text-[#111827]">촬영 Tip</p>
          </div>
          <ul className="list-disc pl-[20px] text-left">
            <li className="text-[16px] font-medium leading-[1.5] tracking-[-0.8px] text-[#6b7280]">밝은 곳에서 촬영해주세요.</li>
            <li className="text-[16px] font-medium leading-[1.5] tracking-[-0.8px] text-[#6b7280]">처방전이 반듯하게 보이도록 맞춰주세요.</li>
            <li className="text-[16px] font-medium leading-[1.5] tracking-[-0.8px] text-[#6b7280]">글자가 선명하게 보이도록 초점을 맞춰주세요.</li>
          </ul>
        </div>
      </div>

      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFileChange}
      />
      <input
        ref={galleryInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {showSheet ? (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-end bg-black/20 px-[8px] pb-[34px]"
          onClick={() => setShowSheet(false)}
        >
          <div className="flex w-full max-w-[402px] flex-col gap-[8px]" onClick={(e) => e.stopPropagation()}>
            <div className="w-full overflow-hidden rounded-[14px] bg-[#F2F2F2] backdrop-blur-[25px]">
              <div className="flex items-center justify-center border-b border-[#E5E5EA] px-[16px] py-[13px]">
                <p className="text-[13px] font-semibold tracking-[-0.08px] text-[#8f8f8f]">업로드 방식을 선택해주세요.</p>
              </div>
              <button
                type="button"
                className="flex h-[56px] w-full items-center justify-center border-b border-[#E5E5EA] text-[17px] text-[#007aff]"
                onClick={() => cameraInputRef.current?.click()}
              >
                사진 촬영
              </button>
              <button
                type="button"
                className="flex h-[56px] w-full items-center justify-center text-[17px] text-[#007aff]"
                onClick={() => galleryInputRef.current?.click()}
              >
                갤러리에서 선택
              </button>
            </div>
            <div className="w-full overflow-hidden rounded-[14px] bg-white backdrop-blur-[25px]">
              <button
                type="button"
                className="flex h-[56px] w-full items-center justify-center text-[17px] font-semibold text-[#007aff]"
                onClick={() => setShowSheet(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </MobileContainer>
  );
}
