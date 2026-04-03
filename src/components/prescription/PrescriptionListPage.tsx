import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MOCK_PRESCRIPTIONS } from '../../data/mockPrescriptions';

import MobileContainer from '../layout/MobileContainer';
import AppHeader from '../layout/AppHeader';

const imgIcon = 'https://www.figma.com/api/mcp/asset/78067cee-8a68-4c06-8069-be06801b481d';
const imgImg = 'https://www.figma.com/api/mcp/asset/b33bd690-f1f8-4c7a-a7fa-4ad41fd2d38e';

type Filter = '전체' | '이번 달' | '지난 달';

function formatDate(dateStr: string) {
  return dateStr.replace(/-/g, '.');
}

function getMonthFilter(dateStr: string, filter: Filter): boolean {
  if (filter === '전체') return true;
  const now = new Date();
  const d = new Date(dateStr);
  if (filter === '이번 달') {
    return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
  }
  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  return d.getFullYear() === lastMonth.getFullYear() && d.getMonth() === lastMonth.getMonth();
}

export default function PrescriptionListPage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<Filter>('전체');
  const [search, setSearch] = useState('');

  const filtered = MOCK_PRESCRIPTIONS.filter(
    (rx) =>
      getMonthFilter(rx.issuedAt, filter) &&
      (search === '' ||
        rx.name.includes(search) ||
        rx.hospitalName.includes(search)),
  );

  const filters: Filter[] = ['전체', '이번 달', '지난 달'];

  return (
    <MobileContainer
      hasBottomNav
      header={<AppHeader title="처방전 목록" />}
    >

          {/* Search bar */}
          <div className="flex justify-center px-[31px] pt-[20px]">
            <div className="relative flex h-[52px] w-full items-center rounded-[8px] bg-[#f3f4f6] shadow-[inset_0px_0px_10px_0px_rgba(0,0,0,0.02)]">
              <img src={imgIcon} alt="" className="ml-[20px] h-[20px] w-[20px] shrink-0" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="처방전 검색"
                className="ml-[12px] flex-1 bg-transparent text-[16px] font-medium tracking-[-0.8px] text-[#111827] outline-none placeholder:text-[#d1d5db]"
              />
            </div>
          </div>

          {/* Gray divider */}
          <div className="mt-[20px] h-[20px] w-full bg-[#f9f9fb]" />

          {/* Filter chips */}
          <div className="flex gap-[10px] px-[31px] pt-[20px]">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`flex h-[35px] items-center justify-center rounded-[20px] border px-[15px] text-[14px] font-medium tracking-[-0.7px] transition-colors ${
                  filter === f
                    ? 'border-[#296dff] bg-[#296dff] text-white'
                    : 'border-[#d1d5db] bg-white text-[#111827]'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Prescription list */}
          <div className="flex flex-col items-center gap-[10px] px-[31px] py-[20px]">
            {filtered.length === 0 ? (
              <p className="mt-[40px] text-[14px] text-[#6b7280]">처방전이 없습니다.</p>
            ) : (
              filtered.map((rx) => (
                <div
                  key={rx.id}
                  className="flex h-[130px] w-full items-center gap-[24px] rounded-[10px] border border-[#d1d5db] bg-white px-[20px]"
                >
                  {/* Icon */}
                  <div className="flex h-[84px] w-[84px] shrink-0 items-center justify-center rounded-[8px] bg-[#f9f9fb]">
                    <img src={imgImg} alt="" className="h-[46px] w-[46px] object-contain" />
                  </div>

                  {/* Info */}
                  <div className="flex flex-col items-start text-left gap-[4px] ml-[8px]">
                    <p className="text-[18px] font-medium tracking-[-0.9px] text-[#111827]">{rx.name}</p>
                    <p className="text-[14px] font-medium tracking-[-0.7px] text-[#6b7280]">{rx.hospitalName}</p>
                    <div className="flex w-full items-center justify-start gap-[12px] mt-[2px]">
                      <p className="text-[14px] font-medium tracking-[-0.7px] text-[#6b7280]">
                        {formatDate(rx.issuedAt)}
                      </p>
                      <div className="flex h-[25px] items-center justify-center rounded-[15px] bg-[rgba(41,109,255,0.1)] px-[10px]">
                        <span className="text-[14px] font-medium tracking-[-0.7px] text-[#296dff]">
                          약 {rx.medicationCount}개
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
    </MobileContainer>
  );
}
