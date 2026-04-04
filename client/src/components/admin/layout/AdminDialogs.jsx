/**
 * AdminDialogs Component
 * Contains global confirmation modals for the admin panel.
 */
export default function AdminDialogs({ actionConfirm, setActionConfirm, deleteConfirm, setDeleteConfirm, executeDelete }) {
  return (
    <>
      {/* Action Confirmation Modal */}
      {actionConfirm && (
        <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4 animate-in fade-in">
           <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl scale-in-center">
              <h3 className="text-2xl font-black mb-3 text-slate-900">{actionConfirm.title}</h3>
              <p className="text-slate-500 mb-8 font-medium">{actionConfirm.message}</p>
              <div className="flex gap-4">
                 <button onClick={() => setActionConfirm(null)} className="flex-1 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors">Go Back</button>
                 <button onClick={actionConfirm.onConfirm} className="flex-1 py-3 bg-[#2d2217] text-white font-bold rounded-xl hover:bg-[#1a140d] shadow-md transition-colors">Confirm</button>
              </div>
           </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm.id && (
        <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4 animate-in fade-in">
           <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl scale-in-center">
              <h3 className="text-2xl font-black mb-3 text-slate-900 capitalize">Delete {deleteConfirm.type}?</h3>
              <p className="text-slate-500 mb-8 font-medium">Are you sure you want to completely erase this record? This action cannot be undone.</p>
              <div className="flex gap-4">
                 <button onClick={() => setDeleteConfirm({ type: null, id: null })} className="flex-1 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors">Go Back</button>
                 <button onClick={executeDelete} className="flex-1 py-3 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 shadow-md transition-colors">Erase</button>
              </div>
           </div>
        </div>
      )}
    </>
  );
}
