'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, MoreHorizontal, ArrowRight, Phone } from 'lucide-react';
import Link from 'next/link';

interface Lead {
  id: string;
  projectName: string;
  clientName: string;
  picClient: string;
  picPhone: string;
  quotedValue: number;
  status: string;
}

const STAGES = [
  { id: 'lead', title: 'Lead' },
  { id: 'survey', title: 'Survey/Req' },
  { id: 'proposal', title: 'Penawaran' },
  { id: 'negotiation', title: 'Negosiasi' },
  { id: 'po_spk', title: 'PO/SPK' },
  { id: 'lost', title: 'Lost' },
];

export function PipelineKanban({ initialLeads }: { initialLeads: Lead[] }) {
  const [leads, setLeads] = useState(initialLeads);

  const moveLead = async (leadId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/crm/leads/${leadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status: newStatus } : l));
      }
    } catch (error) {
      console.error('Failed to move lead', error);
    }
  };

  return (
    <div className="flex gap-4 overflow-x-auto pb-4 h-[calc(100vh-200px)]">
      {STAGES.map(stage => (
        <div key={stage.id} className="flex-shrink-0 w-80 bg-muted/50 rounded-lg p-3 flex flex-col gap-3">
          <div className="flex items-center justify-between px-2">
            <h3 className="font-semibold text-sm flex items-center gap-2">
              {stage.title}
              <Badge variant="secondary">{leads.filter(l => l.status === stage.id).length}</Badge>
            </h3>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex-1 flex flex-col gap-3 overflow-y-auto pr-1">
            {leads
              .filter(l => l.status === stage.id)
              .map(lead => (
                <Card key={lead.id} className="shadow-sm cursor-grab active:cursor-grabbing hover:border-primary transition-colors">
                  <CardHeader className="p-3 space-y-1">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-sm font-bold leading-tight">{lead.projectName}</CardTitle>
                      <Button variant="ghost" size="icon" className="h-6 w-6 -mr-1" asChild>
                        <Link href={`/admin/crm/leads/${lead.id}`}>
                          <MoreHorizontal className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">{lead.clientName}</p>
                  </CardHeader>
                  <CardContent className="p-3 pt-0 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold">Rp {lead.quotedValue?.toLocaleString()}</p>
                      <div className="flex gap-1">
                        {lead.picPhone && (
                           <Button variant="outline" size="icon" className="h-7 w-7" asChild title="WhatsApp PIC">
                             <a href={`https://wa.me/${lead.picPhone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer">
                               <Phone className="h-3 w-3 text-green-600" />
                             </a>
                           </Button>
                        )}
                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => {
                          const currentIndex = STAGES.findIndex(s => s.id === stage.id);
                          if (currentIndex < STAGES.length - 1) {
                            moveLead(lead.id, STAGES[currentIndex + 1].id);
                          }
                        }}>
                          <ArrowRight className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
